# Dental Office Application

A modern, full-stack web application for dental office management. This project includes a React + Vite + Tailwind CSS frontend and a Python (FastAPI) backend, with Supabase for authentication and database.

## Features
- Secure login and registration for admins, staff, and patients
- Role-based dashboards and access control
- Appointment scheduling and management
- Patient records and notes
- AI-powered chat and RAG (Retrieval-Augmented Generation) features
- Responsive, enterprise-grade UI

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Supabase JS
- **Backend:** Python, FastAPI, Supabase (Postgres)
- **Auth & DB:** Supabase Auth & Database

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.10+
- Supabase account (https://supabase.com)

### Setup

#### 1. Clone the repository
```sh
git clone <your-repo-url>
cd Dental-Office-Application
```

#### 2. Frontend
```sh
cd Frontend
npm install
# Create a .env file with your Supabase keys
cp .env.example .env
npm run dev
```

#### 3. Backend
```sh
cd ../Backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Set up your .env with Supabase keys
uvicorn app.main:app --reload
```

#### 4. Supabase
- Run the SQL in `Backend/supabase_schema.sql` in the Supabase SQL editor to set up tables and policies.
- Configure your Supabase project and get your API keys.

## Environment Variables
- Frontend: `Frontend/.env` (see `.env.example`)
- Backend: `Backend/.env` (see `.env.example`)

## Project Structure
```
Dental Office Application/
├── Backend/
│   ├── app/
│   ├── requirements.txt
│   └── supabase_schema.sql
└── Frontend/
    ├── src/
    ├── package.json
    └── tailwind.config.js
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
**Dental Office Application** — Modern, secure, and scalable management for dental practices.