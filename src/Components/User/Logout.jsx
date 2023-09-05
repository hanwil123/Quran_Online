import React from 'react'
import "./logout.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [cookie, removeCookie] = useCookies(["tokennn"]);
    const [isAuthenticated, setIsAuthenticated] = useState(cookie.tokennn);
    const navigate = useNavigate();
  
    const handleDelete = async () => {
      if (cookie.tokennn) {
        console.log("exec ");
        // Delete all cookies
        Object.keys(cookie).forEach((cookieName) => {
          removeCookie(cookieName, "");
        });
        setIsAuthenticated(false);
        console.log(cookie.tokennn);
        // Perform additional cleanup tasks, such as clearing local storage or session storage
        localStorage.clear();
        sessionStorage.clear();
        navigate("/Login");
      }
    };
  
    return (
      <div>
        <button onClick={handleDelete} className="btn" type="button">
          <strong>Logout</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>
  
          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </button>
      </div>
    );
}

export default Logout