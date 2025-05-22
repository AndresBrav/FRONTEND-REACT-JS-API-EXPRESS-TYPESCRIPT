// hooks/useAuthRedirect.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => { /* everything you use inside useEffect you put it in dependencies to avoid errors */
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); 
    }
  }, [navigate]);
}
