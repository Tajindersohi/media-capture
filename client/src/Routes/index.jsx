import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import LoadingIndicator from "../Components/Common/LoadingIndicator";
import PrivateRoute from "./PrivateRoutes";
import { useSelector } from "react-redux";
import Logout from "../Pages/User/Logout/Logout";

const Home = lazy(() => import("../Pages/Home"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const MediaList = lazy(() => import("../Pages/User/Media"));

const AppRoutes = () => {
    const user = useSelector((state)=>state.user.user);
    console.log("useruser",user);
    const commonRoutes = () => (
        <>
            <Route
                element={user  ? <Navigate to="/user-media" replace /> : <Outlet />}
            >
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </>
    );

    const userRoutes = () => (
        <>
            <Route path="/user-media" element={<MediaList />} />
            <Route path="/logout" element={<Logout />} />
        </>
    );

    return (
        <Suspense fallback={<LoadingIndicator />}>
            <Routes>
                {/* Private Routes - Requires Authentication */}
                <Route element={<PrivateRoute />}>
                    {userRoutes()}
                </Route>

                {/* Public Routes */}
                {commonRoutes()}
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
