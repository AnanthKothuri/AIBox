from fastapi import FastAPI
from routers import researchGPT

app = FastAPI()
app.include_router(researchGPT.router)

@app.get("/")
async def root():
    return {"message": "Hello from the research RAG model!"}
