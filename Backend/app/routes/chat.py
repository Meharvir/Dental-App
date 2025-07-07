from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.ai import llm

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str

@router.post("/")
def chat(request: ChatRequest):
    try:
        response = llm.invoke(request.message)
        return {"response": response.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 