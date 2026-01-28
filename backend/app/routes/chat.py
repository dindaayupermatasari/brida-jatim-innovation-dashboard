from fastapi import APIRouter
from app.models.chat import ChatRequest, ChatResponse
from app.services.n8n_service import send_to_n8n

router = APIRouter(prefix="/chat", tags=["AI Chat"])


@router.post("/", response_model=ChatResponse)
def chat_ai(request: ChatRequest):
    result = send_to_n8n(request.message)

    # asumsi dari n8n kamu mengembalikan:
    # { "answer": "teks jawaban AI" }
    return {"answer": result.get("answer", "Tidak ada jawaban dari AI")}
