import { useEffect, useState } from "react";

const DARK_MODE_KEY = "darkMode";

const prefersDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const useDarkMode = () => {
  const [enabled, setEnabled] = useState(() => {
    const savedDarkMode = localStorage.getItem(DARK_MODE_KEY);
    return savedDarkMode ? savedDarkMode === "true" : prefersDarkMode();
  });

  useEffect(() => {
    const rootDoc = document.documentElement.classList;
    localStorage.setItem(DARK_MODE_KEY, enabled.toString());
    enabled ? rootDoc.add("dark") : rootDoc.remove("dark");
  }, [enabled]);

  const toggle = () => setEnabled((prev) => !prev);

  return [enabled, toggle];
};
export default useDarkMode;
