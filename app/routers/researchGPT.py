from sqlalchemy import text
from fastapi import APIRouter, HTTPException, Depends
from dependencies import get_db
from sqlalchemy.ext.asyncio import AsyncSession
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
