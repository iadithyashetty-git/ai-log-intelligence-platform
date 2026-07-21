import { NextResponse } from 'next/server';

const OLLAMA_URL = 'http://127.0.0.1:11434/api/generate';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'qwen2.5:7b';

export async function POST(request: Request) {
  let body: { prompt?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  if (typeof body.prompt !== 'string' || !body.prompt.trim()) {
    return NextResponse.json({ error: 'A prompt is required.' }, { status: 400 });
  }

  try {
    const ollamaResponse = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: body.prompt.trim(),
        stream: false,
      }),
    });

    const data: { response?: unknown; error?: unknown } = await ollamaResponse.json();

    if (!ollamaResponse.ok) {
      const error = typeof data.error === 'string' ? data.error : 'Ollama could not generate a response.';
      return NextResponse.json({ error }, { status: ollamaResponse.status });
    }

    return NextResponse.json({
      response: typeof data.response === 'string' ? data.response : 'No response received.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Could not connect to Ollama. Ensure it is running on port 11434.' },
      { status: 503 }
    );
  }
}
