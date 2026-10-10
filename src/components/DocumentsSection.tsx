"use client";

import { FileText, Download, FileCode2 } from "lucide-react";

export default function DocumentsSection() {
  const documents = [
    {
      title: "Original Practical Programs Document",
      filename: "Original_Practical_Programs.docx",
      path: "/files/Original_Practical_Programs.docx",
      size: "64.5 KB",
      description:
        "Full original college practical manual with all problem statements, complete programs, questions, and reference notes.",
      tag: "Original Full Manual",
      icon: FileText,
    },
    {
      title: "Shortened Programs 1–8 Document",
      filename: "Programs_1_to_8_Shortened.docx",
      path: "/files/Programs_1_to_8_Shortened.docx",
      size: "30.2 KB",
      description:
        "Concise, shortened, and exam-optimized implementations of Programs 1 through 8 for fast revision and easy reference.",
      tag: "Exam-Ready Shortened",
      icon: FileCode2,
    },
  ];

  return (
    <section className="documents-section" aria-labelledby="documents-title">
      <h2 id="documents-title" className="section-title">
        <FileText className="icon" size={24} aria-hidden="true" />
        Practical Documents &amp; Manuals
      </h2>

      <div className="doc-grid">
        {documents.map((doc) => {
          const Icon = doc.icon;
          return (
            <div key={doc.filename} className="doc-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <div className="doc-icon">
                  <Icon size={24} />
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--accent-secondary)",
                    background: "rgba(var(--accent-secondary-rgb), 0.1)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                  }}
                >
                  {doc.tag}
                </span>
              </div>

              <h3>{doc.title}</h3>
              <p>{doc.description}</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "auto",
                  paddingTop: "12px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {doc.size} • .DOCX
                </span>

                <a
                  href={doc.path}
                  download={doc.filename}
                  className="download-btn"
                  aria-label={`Download ${doc.title} (${doc.filename})`}
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
