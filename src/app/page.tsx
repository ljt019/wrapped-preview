"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import TopArtists from "../components/TopArtists";
import LoginWithSpotify from "../components/LoginWithSpotify";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
}

interface UserInfoData {
  display_name: string;
  images: { url: string }[];
}

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

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
  }, []);

  useEffect(() => {
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
        <LoginWithSpotify />
      ) : (
        <div>
          {topArtists.length > 0 && <TopArtists artists={topArtists} />}
        </div>
      )}
    </div>
  );
}
