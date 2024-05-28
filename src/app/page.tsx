"use client";

import TopArtists from "../components/TopArtists";
import { TopArtistsLoading } from "../components/TopArtists";
import LoginWithSpotify from "../components/LoginWithSpotify";
import { useAccessToken } from "../hooks/useAccessToken";
import { useTopArtistsQuery } from "../hooks/useTopArtistsQuery";

export default function Home() {
  const accessToken = useAccessToken();
  const {
    data: topArtists,
    isLoading,
    isError,
    error,
  } = useTopArtistsQuery(accessToken);

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <TopArtistsLoading />;
  }

  return (
    <div>
      {!accessToken ? (
        <LoginWithSpotify />
      ) : (
        <div className="pb-6">
          {topArtists && <TopArtists artists={topArtists} />}
        </div>
      )}
    </div>
  );
}
