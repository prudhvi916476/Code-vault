"use client";

import { Lock, Code2, FileText, Image as ImageIcon } from "lucide-react";
import { programs } from "../data/programs";
import { dipPrograms } from "../data/dipPrograms";

interface DashboardHeaderProps {
  onLock: () => void;
}

export default function DashboardHeader({ onLock }: DashboardHeaderProps) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <div className="logo-icon">
            <Code2 size={22} />
          </div>
          <span className="logo-text">CODE VAULT</span>
          <div className="status-badge">
            <span className="dot" />
            Library Active
          </div>
        </div>
        <button className="lock-btn" onClick={onLock} aria-label="Lock vault">
          <Lock size={16} />
          Lock
        </button>
      </div>

      <h2>Your practical programs, in one place.</h2>
      <p className="sub">
        Search, explore, copy, and download your practical programs whenever you
        need them.
      </p>

      <div className="stats-grid" style={{ marginTop: "28px" }}>
        <div className="stat-card">
          <div className="stat-icon purple">
            <Code2 size={22} />
          </div>
          <div>
            <div className="stat-value">
              {String(programs.length).padStart(2, "0")}
            </div>
            <div className="stat-label">ML &amp; NN Lab Programs</div>
          </div>
        </div>

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
          <div className="stat-icon green">
            <FileText size={22} />
          </div>
          <div>
            <div className="stat-value">02</div>
            <div className="stat-label">Word Documents</div>
          </div>
        </div>
      </div>
    </header>
  );
}
