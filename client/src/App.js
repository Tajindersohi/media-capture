import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/index";
import RootProvider from "./rootProvider";
import NotifierInitializer from "./Assets/Constants/NotifierInitializer";
import { useDispatch } from "react-redux";
import { getMe } from "./store/redux/thunks";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getMe());
  }, [dispatch]);
  
  return (
    <Router>
      <RootProvider>
        <NotifierInitializer /> 
        <AppRoutes />
      </RootProvider>
    </Router>
  );
};

export default App;
