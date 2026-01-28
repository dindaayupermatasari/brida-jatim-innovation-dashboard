from fastapi import FastAPI
from app.routes import chat


app = FastAPI(title="Backend BRIDA Jatim")


@app.get("/")
def root():
    return {"status": "Backend FastAPI BRIDA Jatim running"}


app.include_router(chat.router)
