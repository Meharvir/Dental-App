from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from app.db import supabase

router = APIRouter(prefix="/auth", tags=["auth"])

class AuthRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/signup")
def signup(auth: AuthRequest):
    result = supabase.auth.sign_up({"email": auth.email, "password": auth.password})
    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])
    return {"message": "Signup successful", "user": result["user"]}

@router.post("/login")
def login(auth: AuthRequest):
    result = supabase.auth.sign_in_with_password({"email": auth.email, "password": auth.password})
    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])
    return {"message": "Login successful", "session": result["session"]} 