from fastapi import APIRouter, HTTPException
import sys
sys.path.insert(1, '../')
from gpt import ask

router = APIRouter(
    prefix="/researchGPT",
    tags=["researchGPT"],
    responses={404: {"description": "Not found"}},
)


@router.get("/askGPT")
async def askGPT(query):
  try:
    result = ask(query)
    return result
  except Exception as e:
    raise HTTPException(status_code=404, detail="Error asking GPT")
  
  {
    title: string,
    sections: [
      subtitle: string,
      body: string
    ],
    papers: [
      title: string,
      link: string
    ]
  }
