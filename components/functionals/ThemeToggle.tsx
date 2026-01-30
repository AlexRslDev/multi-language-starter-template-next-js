"use client";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      });
    });
  };

  return (
    <button onClick={toggleTheme} className="p-2 border rounded-full">
      {resolvedTheme === "dark" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
