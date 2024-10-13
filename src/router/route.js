import React from "react";
import { Outlet } from "react-router-dom";

const Router = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Router;
