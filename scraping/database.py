import os
import json
from pypdf import PdfReader
from supabase.client import Client, create_client
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import SupabaseVectorStore
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())
from scraping.arxiv_papers import search

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

def get_paper_details(id):
    try:
        result, count = supabase.table(PAPERS_TABLE) \
            .select('title', 'authors', 'categories', 'pdf_url', 'published', 'updated', 'id') \
            .eq('id', id) \
            .single() \
            .execute()

        return result[1]
    except Exception as e:
        print(f"Couldn't get paper details fromm Supabase: {e}")
        return None

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
    try:
      documents = loader.load()
    except:
      raise RuntimeError("Error loading pdf")

    docs = text_splitter.split_documents(documents)
    for d in docs:
        d.metadata = {'id': data['id']}
        d.page_content = d.page_content.replace('\u0000', '')

    try:
      vector_store = SupabaseVectorStore.from_documents(docs, embeddings, client=supabase, table_name=DOCUMENTS_TABLE, query_name=QUERY_NAME)
    except Exception as e:
        #print("Could not add documents to database")
      raise RuntimeError(f"Could not add documents to database: {e}")


if __name__ == "__main__":
    papers = search("artificial intelligence", max_results=500, downloadPath=DOWNLOAD_FILENAME)
    for data in papers:
        if not supabase_contains_paper(data):
            try:
              add_paper_vector(data, filename=DOWNLOAD_FILENAME)
              add_paper_details(data)
              print(f"added paper {data['title']}")
            except Exception as e:
              print(f"did not add paper: {e}")

    print("successfully added all papers to the vector database")
