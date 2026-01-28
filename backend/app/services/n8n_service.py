import requests

N8N_WEBHOOK_URL = "http://localhost:5678/webhook-test/chat"


def send_to_n8n(message: str):
    payload = {"message": message}

    try:
        response = requests.post(N8N_WEBHOOK_URL, json=payload, timeout=10)
        print("Status code dari n8n:", response.status_code)
        print("Response text:", response.text)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise Exception(f"Gagal menghubungi n8n: {e}")
