"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    if (token) {
      setAccessToken(token);
      window.history.replaceState(null, "", window.location.pathname);
    }

    if (accessToken) {
      fetchUserData();
      fetchTopArtists();
    }
  }, [accessToken]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const fetchTopArtists = async () => {
    try {
      const response = await axios.get(
        `/api/top-artists?access_token=${accessToken}`
      );
      setTopArtists(response.data.items);
    } catch (error) {
      console.error("Error fetching top artists", error);
    }
  };

  return (
    <div>
      {!accessToken ? (
        <Link href="/api/login">Login with Spotify</Link>
      ) : (
        <div>
          {userInfo && (
            <div>
              <h1>Welcome, {userInfo.display_name}</h1>
              <img
                src={userInfo.images[0]?.url}
                alt="User Avatar"
                width="100"
                height="100"
              />
            </div>
          )}
          {topArtists.length > 0 && (
            <div>
              <h2>Top 5 Artists:</h2>
              <ul>
                {topArtists.map((artist) => (
                  <li key={artist.id}>
                    <img
                      src={artist.images[0]?.url}
                      alt={artist.name}
                      width="50"
                      height="50"
                    />
                    {artist.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
