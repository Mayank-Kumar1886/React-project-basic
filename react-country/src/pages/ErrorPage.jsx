import React from "react";
import { NavLink, useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Oops! An error occured</h1>
      {error && <p>{error.data}</p>}
      <NavLink onClick={() => navigate(-1)}>
        <button>Go Back</button>
      </NavLink>
    </div>
  );
};

export default ErrorPage;
