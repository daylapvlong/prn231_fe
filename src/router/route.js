import React from "react";
import { Outlet } from "react-router-dom";

const Router = ({ fetchCartData, fetchUserData }) => {
  return (
    <div>
      <Outlet context={{ fetchCartData, fetchUserData }} />
    </div>
  );
};

export default Router;
