import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: "flex", height: "100vh", position: "relative" }}>

      {/* Sidebar */}
      <div
        style={{
          width: open ? "240px" : "0px",
          overflow: "hidden",
          transition: "0.3s ease",
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          color: "white",
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.15)",
          zIndex: 100
        }}
      >
        <Sidebar />
      </div>

      {/* ☰ Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "absolute",
          top: "16px",
          left: open ? "240px" : "16px",
          transform: "translateX(-50%)",
          width: "40px",
          height: "40px",
          background: "white",
          color: "#1e293b",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          transition: "0.3s ease",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px"
        }}
      >
        ☰
      </button>

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8fafc" }}>

        {/* ✅ Navbar at TOP */}
        <Navbar />

        {/* ✅ Page content BELOW navbar */}
        <div style={{ flex: 1, overflow: "auto" }}>
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;