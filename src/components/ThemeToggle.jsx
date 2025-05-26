import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply theme on initial load and on change
  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = "#0F172A";
      document.body.style.color = "#F1F5F9";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.style.backgroundColor = "#F1F5F9";
      document.body.style.color = "#0F172A";
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "10px 20px",
        background: isDark ? "#F1F5F9" : "#0F172A",
        color: isDark ? "#0F172A" : "#F1F5F9",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        margin: "20px",
      }}
    >
      {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
