from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class User(BaseModel):
    id: str
    email: EmailStr
    is_admin: bool = False

class Patient(BaseModel):
    id: str
    name: str
    email: Optional[EmailStr]
    phone: Optional[str]
    dob: Optional[str]
    notes: Optional[str]

class Appointment(BaseModel):
    id: str
    patient_id: str
    start_time: datetime
    end_time: datetime
    reason: Optional[str]
    status: Optional[str]

class Document(BaseModel):
    id: str
    title: str
    content: str
    uploaded_at: datetime 