import React from "react";
import { Link } from "react-router-dom";

export const Homepage = () => {
  return (
    <div>
      Homepage
      <Link to="/signin">sign in</Link>
    </div>
  );
};
