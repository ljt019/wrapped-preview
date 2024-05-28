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

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  // Effect to handle token initialization
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

  // Effect to fetch data once accessToken is available
  useEffect(() => {
    if (accessToken) {
      fetchTopArtists();
    }
  }, [accessToken]);

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
        <div className="pb-6">
          {topArtists.length > 0 && <TopArtists artists={topArtists} />}
        </div>
      )}
    </div>
  );
}
