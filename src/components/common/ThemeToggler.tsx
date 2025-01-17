import { MouseEventHandler } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";

const ThemeToggler = () => {
  const [darkModeEnabled, toggle] = useDarkMode();
  return (
    <button
      className="text-gray-300 hover:text-gray-200 dark:hover:text-gray-100 hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-300 rounded-full p-1 transition duration-300 ease-in-out"
      onClick={toggle as MouseEventHandler<HTMLButtonElement>}
    >
      {darkModeEnabled ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
export default ThemeToggler;
