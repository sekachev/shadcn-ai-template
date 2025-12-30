#!/usr/bin/env python3
"""
Пример вызова ADK-агента через LiteLLM A2A Gateway
"""

import requests
import json

LITELLM_BASE_URL = "http://localhost:4000"
LITELLM_API_KEY = "your-api-key-here"  # Заменить на реальный API ключ

def call_agent_via_litellm(message: str) -> dict:
    """
    Вызов ADK-агента через LiteLLM A2A Gateway
    """
    url = f"{LITELLM_BASE_URL}/v1/a2a/message/send"

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {LITELLM_API_KEY}"
    }

    payload = {
        "agent_id": "my-adk-agent",  # ID агента в LiteLLM
        "content": [
            {
                "role": "user",
                "parts": [{"text": message}]
            }
        ],
        "session_id": "test-session-001"
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error calling agent: {e}")
        if hasattr(e, 'response'):
            print(f"Response: {e.response.text}")
        raise

if __name__ == "__main__":
    # Пример вызова агента
    result = call_agent_via_litellm("Привет! Расскажи о своих возможностях.")
    print("Ответ агента:")
    print(json.dumps(result, indent=2, ensure_ascii=False))
