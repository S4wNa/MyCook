import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.message);
        return false;
      }

      // Sauvegarder le token et l'utilisateur
      localStorage.setItem("token", json.token);
      localStorage.setItem("user", JSON.stringify({ email: json.email }));

      // Mettre à jour le contexte d'authentification
      dispatch({ type: "LOGIN", payload: { email: json.email } });

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      setError(error.message);
      return false;
    }
  };

  return { login, isLoading, error };
};
