import React from "react";
import { Outlet } from "react-router-dom";

const Router = ({ fetchCartData }) => {
  return (
    <div>
      <Outlet context={{ fetchCartData }} />
    </div>
  );
};

export default Router;
