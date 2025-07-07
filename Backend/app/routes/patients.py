from fastapi import APIRouter, HTTPException
from app.db import supabase
from app.models import Patient
from typing import List

router = APIRouter(prefix="/patients", tags=["patients"])

@router.get("/", response_model=List[Patient])
def get_patients():
    result = supabase.table("patients").select("*").execute()
    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])
    return result["data"]

@router.post("/", response_model=Patient)
def create_patient(patient: Patient):
    result = supabase.table("patients").insert(patient.dict()).execute()
    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])
    return result["data"][0]

@router.get("/{patient_id}", response_model=Patient)
def get_patient(patient_id: str):
    result = supabase.table("patients").select("*").eq("id", patient_id).single().execute()
    if result.get("error"):
        raise HTTPException(status_code=404, detail="Patient not found")
    return result["data"]

@router.put("/{patient_id}", response_model=Patient)
def update_patient(patient_id: str, patient: Patient):
    result = supabase.table("patients").update(patient.dict()).eq("id", patient_id).execute()
    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])
    return result["data"][0]

@router.delete("/{patient_id}")
def delete_patient(patient_id: str):
    result = supabase.table("patients").delete().eq("id", patient_id).execute()
    if result.get("error"):
        raise HTTPException(status_code=400, detail=result["error"]["message"])
    return {"message": "Patient deleted"} 