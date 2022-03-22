import React from "react";
import { logout } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  // Add logic that users who logged in can see this page
  const navigate = useNavigate();
  const onClick = () => {
    logout();
    navigate("/");
  };

  return <button onClick={onClick}>Sign Out</button>;
};

export default Profile;
