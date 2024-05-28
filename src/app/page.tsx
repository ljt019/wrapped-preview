"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import UserInfo from "../components/UserInfo";
import TopArtists from "../components/TopArtists";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
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
            <UserInfo
              displayName={userInfo.display_name}
              imageUrl={userInfo.images[0]?.url}
            />
          )}
          {topArtists.length > 0 && <TopArtists artists={topArtists} />}
        </div>
      )}
    </div>
  );
}
