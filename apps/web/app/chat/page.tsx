'use client';

import { FormEvent, useState } from 'react';

export default function ChatPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAskAI(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const question = prompt.trim();
    if (!question || loading) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'qwen2.5:7b',prompt: question,stream: false }),
      });

      const data: { response?: string; error?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Unable to get an AI response.');
      }

      setResponse(data.response ?? 'No response received.');
    } catch (error) {
      setResponse(
        error instanceof Error ? error.message : 'Error connecting to the AI service.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-8 font-sans">
      <h1 className="text-2xl font-semibold">Ask Anything</h1>

      <form onSubmit={handleAskAI} className="mt-6 space-y-4">
        <label className="block">
          <span className="sr-only">Your question</span>
          <textarea
            rows={4}
            className="w-full rounded border border-zinc-300 p-3"
            placeholder="Type your question here..."
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />
        </label>
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="rounded bg-zinc-900 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </form>

      <section className="mt-8 border-t border-zinc-200 pt-6">
        <h2 className="text-lg font-medium">AI Response</h2>
        <div className="mt-3 min-h-24 whitespace-pre-wrap rounded bg-zinc-50 p-4 text-zinc-900">
          {response || 'Your answer will appear here.'}
        </div>
      </section>
    </main>
  );
}
