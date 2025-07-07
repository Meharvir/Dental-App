from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, patients, appointments, rag, chat

app = FastAPI()

# CORS setup for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and include routers (to be created)
app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(appointments.router)
app.include_router(rag.router)
app.include_router(chat.router)

@app.get("/")
def root():
    return {"message": "Dental SaaS MVP Backend Running"} 