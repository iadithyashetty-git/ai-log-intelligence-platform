import requests

url = "http://localhost:11434/api/generate"

payload = {
    "model": "qwen2.5:7b",
    "prompt": "Explain Machine Learning simply.",
    "stream": False
}

response = requests.post(url, json=payload)

print(response.json()["response"])