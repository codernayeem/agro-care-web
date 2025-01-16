import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebaseConfig";
import ThemeToggler from "./ThemeToggler";
import { FiMenu, FiX } from "react-icons/fi";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const user = auth.currentUser; // Get the current user
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuProfileRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
    if (
      menuProfileRef.current &&
      !menuProfileRef.current.contains(event.target as Node)
    ) {
      setUserDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="bg-green-700 text-white p-3 flex items-center shadow-md">
      <Link
        to="/"
        className="text-xl font-semibold flex items-center space-x-2"
      >
        <img
          src="/favicon.png"
          alt="Agro Care"
          className="w-10 h-10 rounded-full shadow-md bg-slate-50 p-1"
        />
        <p>Agro Care</p>
      </Link>

      {/* Navigation Menu (Hidden on small screens) */}
      <nav className={`items-center ml-auto text-white hidden sm:flex`}>
        <Link
          to="/market"
          className="px-2 py-2  hover:bg-green-800 rounded-md transition duration-300"
        >
          Marketplace
        </Link>
        <Link
          to="/community"
          className="px-2 py-2 hover:bg-green-800 rounded-md transition duration-300"
        >
          Community
        </Link>
        <Link
          to="/cart"
          className="px-2 py-2 hover:bg-green-800 rounded-md transition duration-300"
        >
          <FaShoppingCart className="inline" /> Cart
        </Link>
        <div className="px-2">
          <ThemeToggler />
        </div>
      </nav>

      {/* Navigation Menu (Show on small screens) */}
      <nav
        ref={menuRef}
        className={`sm:hidden absolute top-16 left-0 w-full bg-green-800 text-white transition duration-300 z-10 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } rounded-b-lg`}
      >
        <div className="flex flex-col items-center space-y-2 py-2">
          <Link
            to="/"
            className="px-2 py-2 hover:bg-green-900 rounded-md transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineHome className="inline" /> Home
          </Link>
          <hr className="w-full border-green-900" />
          <Link
            to="/market"
            className="px-2 py-2 hover:bg-green-900 rounded-md transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Marketplace
          </Link>
          <hr className="w-full border-green-900" />
          <Link
            to="/community"
            className="px-2 py-2 hover:bg-green-900 rounded-md transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Community
          </Link>
          <hr className="w-full border-green-900" />
          <Link
            to="/cart"
            className="px-2 py-2 hover:bg-green-900 rounded-md transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <FaShoppingCart className="inline mr-2" /> Cart
          </Link>
          <hr className="w-full border-green-900" />
          <div className="px-2 flex items-center">
            <p className="mr-2">Theme</p>
            <ThemeToggler />
          </div>
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="ml-auto sm:ml-0 relative">
        {user ? (
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center space-x-2 hover:ring-2 hover:ring-green-500 rounded-full p-1 transition duration-300"
          >
            <img
              src={user.photoURL || "/svg/default-profile.svg"}
              alt="User Profile"
              className="w-8 h-8 rounded-full"
            />
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-white hover:ring-2 hover:ring-green-500 rounded-full p-1 transition duration-300"
          >
            <FaUserCircle className="w-8 h-8" />
          </button>
        )}

        {/* Dialog for User Profile */}
        {user && userDropdownOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div
              ref={menuProfileRef}
              className="bg-white text-gray-950 dark:text-white dark:bg-gray-800 w-3/4 md:w-2/4 lg:w-1/4 rounded-lg p-6 shadow-lg"
            >
              <div className="flex w-full">
                <button
                  className="ml-auto text-gray-600 hover:bg-gray-100 p-1 rounded-full transition duration-300"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="text-center">
                <img
                  src={user.photoURL || "/icons/profile_1.png"}
                  alt="User Profile"
                  className="w-20 h-20 rounded-full mx-auto"
                />
                <h2 className="text-lg font-semibold mt-2">
                  {user.displayName || "User"}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="mt-4 space-y-2">
                {/* <button
                  onClick={() => navigate("/settings")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <AiOutlineSetting className="inline mr-2" /> Settings
                </button> */}
                <button
                  onClick={handleLogout}
                  className="flex w-full text-left px-4 py-2 text-sm rounded-md hover:bg-red-100 dark:hover:bg-red-500 transition duration-300"
                >
                  <img
                    src="/icons/logout.png"
                    alt="Logout"
                    className="w-5 h-5 mr-4"
                  ></img>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Menu Icon (Shown on small screens) */}
      <button
        className="sm:hidden text-white text-2xl hover:bg-green-600 p-2 rounded-lg transition duration-300"
        onClick={() => (!menuOpen ? setMenuOpen(true) : null)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </header>
  );
};

export default Header;
