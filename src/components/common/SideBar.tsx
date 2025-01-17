import { Link } from "react-router";

const ListItem: React.FC<{
  children: React.ReactNode;
  to: string;
}> = ({ children, to }) => (
  <li className="py-2 hover:text-green-800 cursor-pointer">
    <Link to={to}>{children}</Link>
  </li>
);

const Sidebar = () => {
  return (
    <div className="hidden min-h-screen md:inline-block bg-green-50 dark:bg-gray-800">
      <aside className="text-gray-500 w-48 p-4">
        <ul>
          <ListItem to="/">Home</ListItem>
          <hr className="border-gray-300 dark:border-gray-700" />
          <ListItem to="/market">Marketplace</ListItem>
          <hr className="border-gray-300 dark:border-gray-700" />
          <ListItem to="/community">Community</ListItem>
          <hr className="border-gray-300 dark:border-gray-700" />
          <ListItem to="/cart">Cart</ListItem>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
