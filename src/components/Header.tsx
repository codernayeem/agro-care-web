import ThemeToggler from "./ThemeToggler";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="bg-green-700 text-white p-2 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold cursor-pointer">
        <div className="flex items-center space-x-2">
          <img
            src="/favicon.png"
            alt="Agro Care"
            className="w-10 h-10 shadow-md rounded-full bg-slate-50 p-1"
          />
          <p>Agro Care</p>
        </div>
      </Link>
      <nav className="hidden sm:flex items-center space-x-4">
        <ThemeToggler />
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/" className="hover:underline">
          All Products
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>
        <Link
          to="/profile"
          className="hover:ring-2 hover:ring-green-500 rounded-full p-1 trasition duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            id="profile"
          >
            <g
              id="Page-1"
              fill="none"
              fill-rule="evenodd"
              stroke="none"
              stroke-width="1"
            >
              <g
                id="Dribbble-Light-Preview"
                fill="#ffffff"
                transform="translate(-180 -2159)"
              >
                <g id="icons" transform="translate(56 160)">
                  <path
                    id="profile-[#1341]"
                    d="M134 2009c-2.217 0-4.019-1.794-4.019-4s1.802-4 4.019-4 4.019 1.794 4.019 4-1.802 4-4.019 4m3.776.673a5.978 5.978 0 0 0 2.182-5.603c-.397-2.623-2.589-4.722-5.236-5.028-3.652-.423-6.75 2.407-6.75 5.958 0 1.89.88 3.574 2.252 4.673-3.372 1.261-5.834 4.222-6.22 8.218a1.012 1.012 0 0 0 1.004 1.109.99.99 0 0 0 .993-.891c.403-4.463 3.836-7.109 7.999-7.109s7.596 2.646 7.999 7.109a.99.99 0 0 0 .993.891c.596 0 1.06-.518 1.003-1.109-.385-3.996-2.847-6.957-6.22-8.218"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
