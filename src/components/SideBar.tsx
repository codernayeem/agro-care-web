import React from "react";

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const ListItem: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
}> = ({ children, onClick }) => (
  <li className="py-2 hover:text-green-800 cursor-pointer" onClick={onClick}>
    {children}
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  return (
    <div className="hidden min-h-screen md:inline-block  bg-green-50 dark:bg-gray-800  transition-colors duration-200">
      <aside className="text-gray-500 w-48 p-4">
        <ul>
          <ListItem onClick={() => setActivePage("home")}>Home</ListItem>
          <hr />
          <ListItem onClick={() => setActivePage("allProducts")}>
            All Products
          </ListItem>
          <hr />
          <ListItem onClick={() => setActivePage("cart")}>Cart</ListItem>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
