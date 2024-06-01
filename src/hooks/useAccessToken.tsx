import { useState, useEffect } from "react";

const TOKEN_EXPIRATION_TIME = 3600 * 1000; // 1 hour in milliseconds

export function useAccessToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");

    if (token) {
      const expirationTime = Date.now() + TOKEN_EXPIRATION_TIME;
      window.localStorage.setItem("accessToken", token);
      window.localStorage.setItem(
        "tokenExpirationTime",
        expirationTime.toString()
      );
      setAccessToken(token);
      window.history.replaceState(null, "", window.location.pathname);
    } else {
      const storedToken = window.localStorage.getItem("accessToken");
      const storedExpirationTime = window.localStorage.getItem(
        "tokenExpirationTime"
      );

      if (storedToken && storedExpirationTime) {
        const expirationTime = parseInt(storedExpirationTime, 10);
        if (Date.now() < expirationTime) {
          setAccessToken(storedToken);
        } else {
          // Token expired
          window.localStorage.removeItem("accessToken");
          window.localStorage.removeItem("tokenExpirationTime");
        }
      }
    }
  }, []); // Run only on mount

  return accessToken;
}
