from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import requests
import uvicorn
import os

app = FastAPI(title="SLPRO Translator Bridge")

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def get_index():
    return FileResponse("traductor.html")

API_KEY = "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"
MODEL_ID = "nvidia/llama-3.3-nemotron-super-49b-v1"

class TranslationRequest(BaseModel):
    text: str
    language: str = "American English"

@app.post("/translate")
async def translate(request: TranslationRequest):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": MODEL_ID,
        "messages": [
            {
                "role": "system",
                "content": f"CRITICAL INSTRUCTION: You are a professional translator. Translate the provided text into the EXACT target language: {request.language}. Do not provide explanations, do not provide the original text, only the translated version in {request.language}."
            },
            {
                "role": "user",
                "content": f"Target Language: {request.language}\nText to translate: {request.text}"
            }
        ],
        "temperature": 0.1
    }

    try:
        response = requests.post(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            headers=headers,
            json=payload
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error en API: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print("\u2705 Servidor de Traducci\u00f3n SLPRO funcionando en http://localhost:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000)
