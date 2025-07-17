import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Sidebar lists note titles, supports selecting, searching, and starting note creation.
 *
 * @param {Object[]} notes
 * @param {string} selectedId
 * @param {(id: string) => void} onSelect
 * @param {() => void} onCreate
 * @param {(query: string) => void} onSearch
 */
export default function Sidebar({
  notes,
  selectedId,
  onSelect,
  onCreate,
  onSearch,
}) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button className="btn-accent" onClick={onCreate} aria-label="Create new note">+ New</button>
        <input
          className="search-input"
          type="text"
          placeholder="Search notes"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <ul className="notes-list" aria-label="List of notes">
        {notes.length === 0 && (
          <li className="empty-list">No notes found.</li>
        )}
        {notes.map((note) => (
          <li
            key={note.id}
            className={
              note.id === selectedId
                ? "note-item selected"
                : "note-item"
            }
            onClick={() => onSelect(note.id)}
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") onSelect(note.id);
            }}
          >
            <div className="note-title">{note.title || "Untitled"}</div>
            <div className="note-meta">
              <span>
                {new Date(note.updated_at || note.created_at).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
