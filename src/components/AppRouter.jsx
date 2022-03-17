import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => (
  <Router>
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
);

export default AppRouter;
