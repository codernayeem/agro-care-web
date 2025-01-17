import React from "react";
import { Link } from "react-router";

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center mt-10">
      <p className="text-xl">404 - Page Not Found</p>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        {" "}
        Go back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
