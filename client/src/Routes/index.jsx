import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingIndicator from "../Components/Common/LoadingIndicator";
import PrivateRoute from "./PrivateRoutes";
import { getMe } from "../store/redux/thunks"; // Fetch user details

const Home = lazy(() => import("../Pages/Home"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const MediaList = lazy(() => import("../Pages/User/Media"));
const Logout = lazy(() => import("../Pages/User/Logout/Logout"));
const MyAccount = lazy(() => import("../Pages/User/MyAccount"));

const AppRoutes = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch]);

    return (
        <Suspense fallback={<LoadingIndicator />}>
            <Routes>
                <Route path="/" element={user?.user ? <Navigate to="/user-account" replace /> : <Home />} />

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/user-media" element={<MediaList />} />
                    <Route path="/user-account" element={<MyAccount />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
