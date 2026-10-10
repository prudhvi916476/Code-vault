"use client";

import { useState, useRef, useEffect } from "react";
import { Lock, Unlock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { ACCESS_CODE } from "../data/programs";

interface AccessGateProps {
  onUnlock: () => void;
}

export default function AccessGate({ onUnlock }: AccessGateProps) {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ACCESS_CODE) {
      sessionStorage.setItem("code-vault-unlocked", "true");
      onUnlock();
    } else {
      setError("Incorrect access code. Please try again.");
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  };

  return (
    <div className="access-gate">
      <form
        className={`access-card ${shaking ? "shake" : ""}`}
        onSubmit={handleSubmit}
        aria-label="Access code entry form"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              background:
                "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lock size={22} color="white" />
          </div>
          <h1>CODE VAULT</h1>
        </div>

        <p className="subtitle">Your programs. Always within reach.</p>

        <p className="description">
          Your personal collection of practical programs, organized and ready
          whenever you need them.
        </p>

        <label htmlFor="access-code" className="sr-only" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
          Access Code
        </label>

        <div className="input-wrapper">
          <input
            ref={inputRef}
            id="access-code"
            type={showCode ? "text" : "password"}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
            placeholder="Enter access code"
            autoComplete="off"
            aria-describedby={error ? "access-error" : undefined}
            aria-invalid={error ? true : undefined}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowCode(!showCode)}
            aria-label={showCode ? "Hide access code" : "Show access code"}
          >
            {showCode ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button type="submit" className="unlock-btn">
          <Unlock size={18} />
          Unlock Vault
        </button>

        {error && (
          <p className="error-msg" id="access-error" role="alert">
            <AlertCircle size={14} />
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
