import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";

const AppRouter = ({ isLoggedIn }) => (
  <Router>
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
    </Routes>
  </Router>
);

export default AppRouter;
