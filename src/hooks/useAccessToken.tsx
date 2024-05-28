import { useState, useEffect } from "react";

export function useAccessToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    console.log("Token from URL:", token);

    if (token) {
      window.localStorage.setItem("accessToken", token);
      setAccessToken(token);
      window.history.replaceState(null, "", window.location.pathname);
    } else {
      const storedToken = window.localStorage.getItem("accessToken");
      console.log("Token from localStorage:", storedToken);
      if (storedToken) {
        setAccessToken(storedToken);
      }
    }
  }, []); // Run only on mount

  return accessToken;
}
