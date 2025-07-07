from fastapi import APIRouter, HTTPException
from app.db import supabase
from app.models import Appointment
from typing import List

router = APIRouter(prefix="/appointments", tags=["appointments"])

@router.get("/", response_model=List[Appointment])
def get_appointments():
    result = supabase.table("appointments").select("*").execute()
    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])
    return result["data"]

@router.post("/", response_model=Appointment)
def create_appointment(appointment: Appointment):
    result = supabase.table("appointments").insert(appointment.dict()).execute()
    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])
    return result["data"][0]

@router.get("/{appointment_id}", response_model=Appointment)
def get_appointment(appointment_id: str):
    result = supabase.table("appointments").select("*").eq("id", appointment_id).single().execute()
    if result.get("error"):
        raise HTTPException(status_code=404, detail="Appointment not found")
    return result["data"]

@router.put("/{appointment_id}", response_model=Appointment)
def update_appointment(appointment_id: str, appointment: Appointment):
    result = supabase.table("appointments").update(appointment.dict()).eq("id", appointment_id).execute()
    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])
    return result["data"][0]

@router.delete("/{appointment_id}")
def delete_appointment(appointment_id: str):
    result = supabase.table("appointments").delete().eq("id", appointment_id).execute()
    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])
    return {"message": "Appointment deleted"} 