"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Check, Copy, Download, X, Code2, Terminal } from "lucide-react";
import type { Program } from "../data/programs";

interface CodeViewerProps {
  program: Program;
  onClose: () => void;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function highlightPython(code: string): string {
  // Line by line highlighting to accurately handle comments and strings
  const lines = code.split("\n");

  const highlightedLines = lines.map((line) => {
    // Check if line contains a comment outside string
    let commentIdx = -1;
    let inQuote: string | null = null;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if ((char === '"' || char === "'") && (i === 0 || line[i - 1] !== "\\")) {
        if (!inQuote) inQuote = char;
        else if (inQuote === char) inQuote = null;
      } else if (char === "#" && !inQuote) {
        commentIdx = i;
        break;
      }
    }

    let codePart = commentIdx !== -1 ? line.slice(0, commentIdx) : line;
    const commentPart = commentIdx !== -1 ? line.slice(commentIdx) : "";

    // Highlight strings in codePart
    const stringPlaceholders: string[] = [];
    codePart = codePart.replace(/(["'])(?:\\.|[^\\])*?\1/g, (match) => {
      stringPlaceholders.push(
        `<span class="string">${escapeHtml(match)}</span>`
      );
      return `___STR_${stringPlaceholders.length - 1}___`;
    });

    // Escape remaining code HTML
    codePart = escapeHtml(codePart);

    // Keywords
    const keywords =
      /\b(import|from|as|def|class|return|if|elif|else|for|while|in|is|not|and|or|try|except|finally|with|lambda|yield|raise|break|continue|pass|global|assert)\b/g;
    codePart = codePart.replace(
      keywords,
      '<span class="keyword">$1</span>'
    );

    // Builtins / Booleans / None
    const builtins =
      /\b(print|range|len|enumerate|int|float|str|list|dict|set|tuple|bool|open|min|max|sum|abs|round|type|True|False|None)\b/g;
    codePart = codePart.replace(
      builtins,
      '<span class="builtin">$1</span>'
    );

    // Numbers
    codePart = codePart.replace(
      /\b(\d+(?:\.\d+)?)\b/g,
      '<span class="number">$1</span>'
    );

    // Function calls
    codePart = codePart.replace(
      /\b([a-zA-Z_]\w*)(?=\s*\()/g,
      '<span class="function">$1</span>'
    );

    // Restore strings
    codePart = codePart.replace(
      /___STR_(\d+)___/g,
      (_, idx) => stringPlaceholders[Number(idx)]
    );

    // Append highlighted comment if any
    if (commentPart) {
      codePart += `<span class="comment">${escapeHtml(commentPart)}</span>`;
    }

    return codePart;
  });

  return highlightedLines.join("\n");
}

export default function CodeViewer({ program, onClose }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [program, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(program.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = program.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([program.code], { type: "text/x-python;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = program.filename || `program_${program.id}.py`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const highlightedCode = useMemo(() => {
    return highlightPython(program.code);
  }, [program.code]);

  const lineCount = program.code.split("\n").length;

  return (
    <section
      ref={viewerRef}
      className="code-viewer"
      aria-label={`Source code viewer for ${program.title}`}
    >
      <div className="viewer-header">
        <div className="viewer-info">
          <div className="viewer-title">
            <span className="program-number">
              #{String(program.id).padStart(2, "0")}
            </span>
            <span>{program.title}</span>
          </div>
          <div className="viewer-meta">
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Terminal size={14} />
              {program.filename}
            </span>
            <span>•</span>
            <span>{lineCount} lines</span>
            <span>•</span>
            <span>{program.language}</span>
          </div>
        </div>

        <div className="viewer-actions">
          <button
            type="button"
            className={`action-btn ${copied ? "success" : ""}`}
            onClick={handleCopy}
            aria-label={copied ? "Code copied" : "Copy source code"}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied to Clipboard" : "Copy Code"}
          </button>

          <button
            type="button"
            className="action-btn"
            onClick={handleDownload}
            aria-label={`Download ${program.filename}`}
          >
            <Download size={16} />
            Download .py
          </button>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close code viewer"
          >
            <X size={16} />
            Close
          </button>
        </div>
      </div>

      <div className="code-container" tabIndex={0} aria-label="Code display">
        <pre>
          <code
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </section>
  );
}
