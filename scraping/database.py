import os
import json
from pypdf import PdfReader
from supabase.client import Client, create_client
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import SupabaseVectorStore
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import PyPDFLoader
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())
from arxiv_papers import search

supabase_url = os.environ['SUPABASE_URL']
supabase_key = os.environ['SUPABASE_KEY']

supabase: Client = create_client(supabase_url, supabase_key)
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
embeddings = OpenAIEmbeddings()

# constants
DOCUMENTS_TABLE = "documents"
PAPERS_TABLE = "papers"
QUERY_NAME = "match_documents"
DOWNLOAD_FILENAME = "paper.pdf"

def supabase_contains_paper(data):
    try:
        result, count = supabase.table(PAPERS_TABLE) \
            .select('id') \
            .eq('id', data['id']) \
            .execute()
        
        return result[1] != []
    except Exception as e:
        print(f"Couldn't check if paper is in Supabase: {e}")


def add_paper_details(data):
    try:
        result, count = supabase.table(PAPERS_TABLE) \
            .upsert(data) \
            .execute()
    except Exception as e:
        print(f"Could not add paper data to Supabase: {e}")

def add_paper_vector(data, filename):
    if not os.path.exists(filename):
        raise ValueError(f"path to pdf {filename} does not exist")
    
    loader = PyPDFLoader(filename)
    documents = loader.load()
    docs = text_splitter.split_documents(documents)
    for d in docs:
        d.metadata = {'id': data['id']}
        d.page_content = d.page_content.replace('\u0000', '')

    try:
        vector_store = SupabaseVectorStore.from_documents(docs, embeddings, client=supabase, table_name=DOCUMENTS_TABLE, query_name=QUERY_NAME)
    except Exception as e:
        raise RuntimeError(f"Could not add documents to database: {e}")
    

if __name__ == "__main__":
    papers = search("artificial intelligence", max_results=10, downloadPath=DOWNLOAD_FILENAME)
    for data in papers:
        if not supabase_contains_paper(data):
            add_paper_vector(data, filename=DOWNLOAD_FILENAME)
            add_paper_details(data)
            print(f"added paper {data['title']}")

    print("successfully added all papers to the vector database")
