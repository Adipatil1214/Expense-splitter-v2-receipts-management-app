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
          width: open ? "200px" : "0px",
          overflow: "hidden",
          transition: "0.3s",
          background: "#2c3e50",
          color: "white",
        }}
      >
        <Sidebar />
      </div>

      {/* ☰ Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "absolute",
          top: "10px",
          left: open ? "200px" : "10px",
          transform: "translateX(-50%)",
          width: "35px",
          height: "35px",
          background: "#2c3e50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
          transition: "0.3s",
          zIndex: 1000,
        }}
      >
        ☰
      </button>

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* ✅ Navbar at TOP */}
        <Navbar />

        {/* ✅ Page content BELOW navbar */}
        <div style={{ padding: "20px", flex: 1 }}>
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;