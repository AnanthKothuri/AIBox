import os
import openai
import json
from supabase.client import Client, create_client
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.vectorstores import SupabaseVectorStore
from langchain.text_splitter import CharacterTextSplitter
from dotenv import load_dotenv, find_dotenv
from scraping.database import get_paper_details
_ = load_dotenv(find_dotenv())

supabase_url = os.environ['SUPABASE_URL']
supabase_key = os.environ['SUPABASE_KEY']
openai.api_key = os.environ['OPENAI_API_KEY']

supabase: Client = create_client(supabase_url, supabase_key)
embeddings = OpenAIEmbeddings()

# Create the vector store
vector_store = SupabaseVectorStore(
    client=supabase,
    table_name='documents',
    embedding=embeddings,
)

def perform_similarity_search(query_vector, top_k=3):
    # Perform similarity search
    docs = vector_store.similarity_search(query_vector, k=top_k)
    return docs

def reformat_papers(papers):
    results = []
    seen = set()
    for p in papers:
        if p.metadata['id'] in seen: continue
        details = get_paper_details(p.metadata['id'])
        if details:
            seen.add(p.metadata['id'])
            results.append(p.page_content + "\n\nPAPER DETAILS: " + str(details))

    # print(results)
    return results

def ask_gpt(query, context):
    messages = [
        {
            "role": "system",
            "content": \
                """Formatting:
                Create a title related to the text. Omit the word "title".
                The output should be valid markdown. The allowed markdown elements are:
                # H1
                ## H2
                ### H3
                A paragraph
                1. Ordered List Item 1
                2. Ordered List Item 2
                - Unordered List Item 1
                - Unordered List Item 2 
                You are a research paper-finding chatbot. Given a a user's question about computer science ideas or research, discuss the current research that has been done, what papers have used this research (including links, titles, and authors), and help guide users to next steps for their research ideas. Be sure to elaborate a decent amount about the paper's works and research, and give large amounts of substance."""

        },
        {
            "role": "user",
            "content": query,
        },
        {
            "role": "assistant",
            "content": '\n\n'.join(context),
        }
    ]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0613",
        messages=messages,
        # max_tokens=400,  
        temperature=0.4,  
    )
    print("Assistant's Response:")
    print(response['choices'][0]['message']['content'])

def ask(query):
    papers = perform_similarity_search(query)
    context = reformat_papers(papers)
    ask_gpt(query, context)

if __name__ == "__main__":
    query = input("Enter the query here, or q to quit: ")
    
    while query != "q":
        ask(query)
        print("")
        query = input("Enter the query here, or q to quit: ")


