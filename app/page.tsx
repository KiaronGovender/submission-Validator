"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [testUrl, setTestUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const validationUrl = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${encodeURIComponent(testUrl)}&email=${encodeURIComponent(email)}`;

      const res = await fetch(validationUrl);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Failed to connect to the validation endpoint. This might be due to CORS if the endpoint doesn't allow browser requests directly. Try opening the URL in a new tab." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] font-sans text-white p-6">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full"></div>
      </div>

      <main className="w-full max-w-lg bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Submission Validator
            </h1>
            <p className="text-zinc-500 mt-1">Verify your API endpoint submission</p>
          </div>
          <Image
            className="opacity-80"
            src="/next.svg"
            alt="Next.js logo"
            width={70}
            height={15}
            priority
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-400 ml-1">
              Your Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="e.g. user@example.com"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all placeholder:text-zinc-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium text-zinc-400 ml-1">
              Your API Endpoint URL (to be tested)
            </label>
            <input
              id="url"
              type="text"
              required
              placeholder="e.g. https://your-project.vercel.app/api"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all placeholder:text-zinc-700"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98]"
          >
            {loading ? "Triggering Validator..." : "Run Validation Test"}
          </button>
        </form>

        {response && (
          <div className="mt-8 p-5 bg-black/40 border border-white/10 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${response.error ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className="text-sm font-medium text-zinc-300">
                {response.error ? "Connection Issue" : "Validation Result"}
              </span>
            </div>
            <pre className="text-xs font-mono text-zinc-400 overflow-x-auto p-3 bg-zinc-950/50 rounded-lg">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
