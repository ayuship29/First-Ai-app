"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setReply(data.reply || "⚠️ No response from AI.");
    } catch (error) {
      console.error(error);
      setReply("⚠️ AI failed to respond. Check console.");
    }

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-black overflow-hidden">
      <div
        className="absolute inset-0 origin-top opacity-40 animate-gridmove"
        style={{
          backgroundImage: `linear-gradient(#1f2937 1px, transparent 1px),
                            linear-gradient(90deg, #1f2937 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          transform: "perspective(900px) rotateX(65deg)",
        }}
      />

      <motion.img
        src="/robot.png"
        alt="AI Robot"
        className="w-80 z-50"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold z-10 text-white"
      >
        HOW CAN I HELP YOU ?
      </motion.h1>

      <motion.textarea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-3 p-3 m-5 w-150 rounded z-20 bg-gray-900 border-b-cyan-200"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={askAI}
        className="bg-blue-600 text-white text-2xl font-sans px-5 py-3 rounded z-10"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </motion.button>

      {reply && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border p-4 mt-4 w-80 bg-gray-100 text-gray-900 rounded z-10"
        >
          {reply}
        </motion.div>
      )}
    </main>
  );
}
