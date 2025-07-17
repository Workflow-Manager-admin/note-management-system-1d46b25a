import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * NoteEditor displays and edits note details. Handles create/edit/delete.
 *
 * @param {Object|null} note
 * @param {(note: Object) => void} onSave
 * @param {(id: string) => void} onDelete
 */
export default function NoteEditor({ note, onSave, onDelete }) {
  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setTitle(note?.title || "");
    setBody(note?.body || "");
    setDirty(false);
  }, [note?.id]);

  if (!note) {
    return (
      <div className="main-content-empty">
        <p>Select a note or create a new one to get started.</p>
      </div>
    );
  }

  const handleSave = () => {
    if (!title.trim() && !body.trim()) return;
    onSave({
      ...note,
      title: title.trim() || "Untitled",
      body: body,
    });
    setDirty(false);
  };

  return (
    <section className="main-content">
      <div className="note-edit-header">
        <input
          className="note-title-input"
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setDirty(true);
          }}
        />
        <button className="btn-secondary" onClick={handleSave} disabled={!dirty}>
          Save
        </button>
        <button
          className="btn-delete"
          onClick={() => {
            if (window.confirm("Delete this note?")) {
              onDelete(note.id);
            }
          }}
        >
          Delete
        </button>
      </div>
      <textarea
        className="note-body-input"
        placeholder="Type your note here..."
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          setDirty(true);
        }}
        rows={16}
      />
    </section>
  );
}
