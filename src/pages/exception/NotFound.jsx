import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="grid min-h-[80vh] place-items-center px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h4 className="text-3xl font-bold mt-4 tracking-tight sm:text-5xl capitalize">
          page not found
        </h4>
        <p className="text-lg mt-6 leading-7">
          Sorry we couldn't find the page you're looking for
        </p>
        <div className="mt-10">
          <Link to="/" className="btn btn-secondary">
            go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
