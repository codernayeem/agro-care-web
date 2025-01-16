import { MouseEventHandler } from "react";
import useDarkMode from "../useDarkMode";
import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";

const ThemeToggler = () => {
  const [darkModeEnabled, toggle] = useDarkMode();
  return (
    <button
      className="text-gray-900 dark:text-gray-300"
      onClick={toggle as MouseEventHandler<HTMLButtonElement>}
    >
      {darkModeEnabled ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
export default ThemeToggler;
