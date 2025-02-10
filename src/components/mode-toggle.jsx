import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const [theme, setTheme] = useState("system");
  const [systemTheme, setSystemTheme] = useState("light");
  const storageKey = "vite-ui-theme";

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) || "system";
    setTheme(savedTheme);

    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setSystemTheme(systemPrefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    const root = document.documentElement; 
    root.classList.remove("light", "dark");

    const effectiveTheme = theme === "system" ? systemTheme : theme;
    root.classList.add(effectiveTheme);
  }, [theme, systemTheme]);

  const toggleTheme = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  const effectiveTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={toggleTheme}
      className=" h-10 w-10 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all ease-in-out duration-100"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          ${effectiveTheme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          ${effectiveTheme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export default ModeToggle;
