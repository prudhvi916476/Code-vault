"use client";

import { useState, useEffect, useMemo } from "react";
import AccessGate from "../components/AccessGate";
import DashboardHeader from "../components/DashboardHeader";
import DocumentsSection from "../components/DocumentsSection";
import SearchFilter from "../components/SearchFilter";
import ProgramCard from "../components/ProgramCard";
import CodeViewer from "../components/CodeViewer";
import { programs, categories, Program } from "../data/programs";
import { SearchX, Code2, ShieldCheck, Heart } from "lucide-react";

export default function Home() {
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
    return programs.filter((p) => {
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
      const inNumber = `program ${p.id}`.includes(q) || `#${p.id}`.includes(q) || `${p.id}` === q;

      return inTitle || inDesc || inFilename || inCode || inCategories || inNumber;
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
          Initializing Code Vault...
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return <AccessGate onUnlock={handleUnlock} />;
  }

  return (
    <div className="dashboard unlock-anim">
      <DashboardHeader onLock={handleLock} />

      <DocumentsSection />

      {selectedProgram && (
        <CodeViewer
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}

      <section aria-labelledby="programs-section-title">
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
            id="programs-section-title"
            className="section-title"
            style={{ marginBottom: 0 }}
          >
            <Code2 className="icon" size={24} aria-hidden="true" />
            Shortened Programs (1–19)
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
            Showing {filteredPrograms.length} of {programs.length} programs
          </span>
        </div>

        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <div className="program-grid" role="region" aria-label="Program list">
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
              <h3>No matching programs found</h3>
              <p>
                No programs matched &ldquo;{searchQuery}&rdquo; in category &ldquo;
                {selectedCategory}&rdquo;. Try clearing your search or switching
                filters.
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
          <strong>CODE VAULT</strong> — Personal College Practical Programs Library
        </p>
        <p style={{ marginTop: "6px", opacity: 0.8 }}>
          Access Code: <code style={{ color: "var(--accent-secondary)" }}>456789</code> • Designed for rapid retrieval, study &amp; exams.
        </p>
      </footer>
    </div>
  );
}
