import React from 'react'
import { Outlet } from "react-router-dom";

const BoxedFancyRouter = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default BoxedFancyRouter
