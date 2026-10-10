"use client";

import { Search, X } from "lucide-react";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: SearchFilterProps) {
  return (
    <div className="search-filter">
      <div className="search-bar">
        <Search className="search-icon" size={18} aria-hidden="true" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search programs by name, description, topic, or code..."
          aria-label="Search programs"
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => onSearchChange("")}
            aria-label="Clear search input"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      <div className="filter-tags" role="toolbar" aria-label="Filter programs by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-tag ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => onCategoryChange(cat)}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
