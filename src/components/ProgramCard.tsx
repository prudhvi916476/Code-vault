"use client";

import { ArrowRight } from "lucide-react";
import type { Program } from "../data/programs";

interface ProgramCardProps {
  program: Program;
  onSelect: (program: Program) => void;
}

export default function ProgramCard({ program, onSelect }: ProgramCardProps) {
  return (
    <article
      className="program-card"
      onClick={() => onSelect(program)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(program);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View code for Program ${program.id}: ${program.title}`}
    >
      <div className="card-header">
        <span className="program-number">#{String(program.id).padStart(2, "0")}</span>
        <span className="language-tag">{program.language}</span>
      </div>

      <h3 className="card-title">{program.title}</h3>
      <p className="card-desc">{program.description}</p>

      <div className="card-footer">
        <span className="view-code-btn">
          View Code <ArrowRight size={16} />
        </span>
        <div className="card-categories">
          {program.categories.slice(0, 2).map((cat) => (
            <span key={cat} className="card-category">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
