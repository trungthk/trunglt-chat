import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
