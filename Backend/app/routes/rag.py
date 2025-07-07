from fastapi import APIRouter, UploadFile, File, HTTPException
from app.chroma import chroma_client
from app.models import Document
from datetime import datetime
from typing import List

router = APIRouter(prefix="/rag", tags=["rag"])

@router.post("/upload", response_model=Document)
def upload_document(file: UploadFile = File(...)):
    content = file.file.read().decode("utf-8")
    doc_id = file.filename + str(datetime.utcnow().timestamp())
    chroma_client.get_or_create_collection("docs").add(
        documents=[content],
        metadatas=[{"filename": file.filename}],
        ids=[doc_id]
    )
    return Document(id=doc_id, title=file.filename, content=content, uploaded_at=datetime.utcnow())

@router.get("/search", response_model=List[Document])
def search_documents(query: str):
    collection = chroma_client.get_or_create_collection("docs")
    results = collection.query(query_texts=[query], n_results=3)
    docs = []
    for doc, meta, doc_id in zip(results["documents"][0], results["metadatas"][0], results["ids"][0]):
        docs.append(Document(id=doc_id, title=meta["filename"], content=doc, uploaded_at=datetime.utcnow()))
    return docs 