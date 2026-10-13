"use client";

import { useState, useEffect, useMemo } from "react";
import AccessGate from "../../components/AccessGate";
import SearchFilter from "../../components/SearchFilter";
import ProgramCard from "../../components/ProgramCard";
import CodeViewer from "../../components/CodeViewer";
import { dipPrograms, dipCategories } from "../../data/dipPrograms";
import type { Program } from "../../data/programs";
import {
  Lock,
  Image as ImageIcon,
  SearchX,
  ArrowLeft,
  ExternalLink,
  Layers,
  FileCode2,
} from "lucide-react";
import Link from "next/link";

export default function DipPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Programs");

  useEffect(() => {
    setHasMounted(true);
    const unlocked = sessionStorage.getItem("code-vault-unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleLock = () => {
    sessionStorage.removeItem("code-vault-unlocked");
    setIsUnlocked(false);
    setSelectedProgram(null);
  };

  const filteredPrograms = useMemo(() => {
    return dipPrograms.filter((p) => {
      const matchesCategory =
        selectedCategory === "All Programs" ||
        p.categories.includes(selectedCategory);

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = p.title.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      const inFilename = p.filename.toLowerCase().includes(q);
      const inCode = p.code.toLowerCase().includes(q);
      const inCategories = p.categories.some((cat) =>
        cat.toLowerCase().includes(q)
      );
      const inNumber =
        `program ${p.id}`.includes(q) ||
        `#${p.id}`.includes(q) ||
        `${p.id}` === q;

      return (
        inTitle || inDesc || inFilename || inCode || inCategories || inNumber
      );
    });
  }, [searchQuery, selectedCategory]);

  if (!hasMounted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--bg-main)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Initializing DIP Lab Window...
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return <AccessGate onUnlock={handleUnlock} />;
  }

  return (
    <div className="dashboard unlock-anim">
      <header className="header">
        <div className="header-top">
          <div className="logo">
            <div className="logo-icon">
              <ImageIcon size={22} />
            </div>
            <span className="logo-text">DIP LAB VAULT</span>
            <div className="status-badge">
              <span className="dot" />
              Dedicated Window
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              href="/"
              className="open-window-btn"
              style={{ padding: "8px 14px" }}
            >
              <ArrowLeft size={16} />
              ML &amp; NN Lab
            </Link>
            <button
              className="lock-btn"
              onClick={handleLock}
              aria-label="Lock vault"
            >
              <Lock size={16} />
              Lock
            </button>
          </div>
        </div>

        <h2>Digital Image Processing Practical Programs</h2>
        <p className="sub">
          Independent workspace containing all {dipPrograms.length} Digital Image
          Processing (OpenCV &amp; NumPy) lab practicals with full code,
          explanations, and copy-ready scripts.
        </p>

        <div className="stats-grid" style={{ marginTop: "28px" }}>
          <div className="stat-card">
            <div className="stat-icon cyan">
              <ImageIcon size={22} />
            </div>
            <div>
              <div className="stat-value">
                {String(dipPrograms.length).padStart(2, "0")}
              </div>
              <div className="stat-label">DIP Lab Programs</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <Layers size={22} />
            </div>
            <div>
              <div className="stat-value">
                {String(dipCategories.length - 1).padStart(2, "0")}
              </div>
              <div className="stat-label">DIP Topics &amp; Categories</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <FileCode2 size={22} />
            </div>
            <div>
              <div className="stat-value">Python</div>
              <div className="stat-label">OpenCV &amp; NumPy</div>
            </div>
          </div>
        </div>
      </header>

      {selectedProgram && (
        <CodeViewer
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}

      <section role="region" aria-labelledby="dip-section-title">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <h2
            id="dip-section-title"
            className="section-title"
            style={{ marginBottom: 0 }}
          >
            <ImageIcon className="icon" size={24} aria-hidden="true" />
            DIP Practical Programs (1–{dipPrograms.length})
          </h2>
          <span
            style={{
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              background: "var(--bg-card)",
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
            }}
          >
            Showing {filteredPrograms.length} of {dipPrograms.length} programs
          </span>
        </div>

        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={dipCategories}
        />

        <div className="program-grid" role="region" aria-label="DIP Program list">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onSelect={(prog) => setSelectedProgram(prog)}
              />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <SearchX size={32} />
              </div>
              <h3>No matching DIP programs found</h3>
              <p>
                No DIP programs matched &ldquo;{searchQuery}&rdquo; in category
                &ldquo;{selectedCategory}&rdquo;. Try clearing your search or
                switching filters.
              </p>
              <button
                type="button"
                className="filter-tag"
                style={{ marginTop: "16px", display: "inline-block" }}
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Programs");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <p>
          <strong>DIP LAB VAULT</strong> — Digital Image Processing Practical
          Programs Window
        </p>
        <p style={{ marginTop: "6px", opacity: 0.8 }}>
          Access Code: <code style={{ color: "var(--accent-secondary)" }}>456789</code> • Dedicated DIP Workspace.
        </p>
      </footer>
    </div>
  );
}
