import React from "react";

/**
 * PUBLIC_INTERFACE
 * Header displays the app title and navigation.
 */
export default function Header() {
  return (
    <header className="header">
      <h1 className="header-title">Notes</h1>
      <span className="header-subtitle">Modern Note Management</span>
    </header>
  );
}
