import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";
import { supabase } from "./supabaseClient";

// PUBLIC_INTERFACE
// Main App for the notes management system
function App() {
  // THEME HANDLING
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // NOTES APP LOGIC
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch notes from Supabase (with optional search)
  const fetchNotes = useCallback(async (q = "") => {
    setLoading(true);
    setErrorMsg("");
    let query = supabase
      .from("notes")
      .select("*")
      .order("updated_at", { ascending: false });
    if (q.trim()) {
      query = query.ilike("title", `%${q}%`);
    }
    const { data, error } = await query;
    if (error) {
      setErrorMsg("Could not fetch notes.");
    } else {
      setNotes(data || []);
      // Reselect note by id if possible, else pick first in list
      setSelectedId((cur) => {
        if (!data?.length) return null;
        if (cur && data.some((n) => n.id === cur)) return cur;
        return data[0]?.id || null;
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotes(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Create new note
  const handleCreate = async () => {
    setLoading(true);
    setErrorMsg("");
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title: "Untitled", body: "" }])
      .select()
      .single();
    if (error) {
      setErrorMsg("Failed to create note.");
    } else {
      await fetchNotes();
      setSelectedId(data.id);
    }
    setLoading(false);
  };

  // Save (edit) note
  const handleSave = async (note) => {
    setLoading(true);
    setErrorMsg("");
    const { error } = await supabase
      .from("notes")
      .update({
        title: note.title,
        body: note.body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", note.id);
    if (error) {
      setErrorMsg("Failed to save note.");
    } else {
      await fetchNotes();
      setSelectedId(note.id);
    }
    setLoading(false);
  };

  // Delete note
  const handleDelete = async (id) => {
    setLoading(true);
    setErrorMsg("");
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      setErrorMsg("Failed to delete note.");
    } else {
      await fetchNotes();
    }
    setLoading(false);
  };

  // Search notes
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Find selected note object
  const selectedNote = notes.find((n) => n.id === selectedId) || null;

  return (
    <div className="App notes-app">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <Header />
      <div className="notes-layout">
        <Sidebar
          notes={notes}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onCreate={handleCreate}
          onSearch={handleSearch}
        />
        <main className="main-area">
          {loading && (
            <div className="status-msg">
              Loading...
            </div>
          )}
          {errorMsg && (
            <div className="status-msg error">{errorMsg}</div>
          )}
          {!loading && !errorMsg && (
            <NoteEditor
              note={selectedNote}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
