"use client";
import useLLM from "usellm";
import { useState } from "react";

export default function HomePage() {
  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" }); // for testing only
  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("");

  async function handleClick() {
    try {
      const { message } = await llm.chat({
        messages: [{ role: "user", content: prompt }],
        stream: true,
        onStream: ({ message }) => setResult(message.content),
      });
      setResult(message.content);
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }

  return (
    <div className="p-4">
      <input 
        type="text" 
        placeholder="Ask me anything" 
        value={prompt} 
        onChange={e => setPrompt(e.target.value)} 
        className="p-2 border rounded mr-2"
        autoFocus 
      />
      <button
        className="border p-2 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 rounded w-20 mb-2"
        onClick={handleClick}
      >
        Send
      </button>
      <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>
    </div>
  );
}