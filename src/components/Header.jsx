import React from "react";

const Header = () => {
  return (
    <div
      className="p-2"
      style={{
        backgroundColor: "var(--indigo-700)",
        color: "var(--primary-color-text)",
        borderRadius: "var(--border-radius)",
        padding: "3rem",
      }}
    >
      <h2>User List</h2>
    </div>
  );
};

export default Header;
