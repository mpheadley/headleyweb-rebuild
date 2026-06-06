"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      router.push("/profile");
    } else {
      setError("Wrong password.");
    }
  }

  return (
    <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", background: "#faf8f4" }}>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "320px", padding: "2rem" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: "#1a1612", marginBottom: "0.5rem" }}>Enter PIN</h1>
        <input
          type="password"
          placeholder="PIN"
          value={pw}
          onChange={e => setPw(e.target.value)}
          autoFocus
          style={{ padding: "0.75rem 1rem", border: "1px solid #ddd5c8", borderRadius: "6px", fontSize: "1rem", background: "#fff" }}
        />
        {error && <p style={{ color: "#8B4513", fontSize: "0.85rem" }}>{error}</p>}
        <button type="submit" style={{ padding: "0.75rem", background: "#1a1612", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "1rem" }}>
          Enter
        </button>
      </form>
    </main>
  );
}
