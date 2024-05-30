"use client";

import TopArtists from "../components/TopArtists";
import { TopArtistsLoading } from "../components/TopArtists";
import LoginWithSpotify from "../components/LoginWithSpotify";
import { useAccessToken } from "../hooks/useAccessToken";
import { useTopArtistsQuery } from "../hooks/useTopArtistsQuery";
import { useTopTracksQuery } from "../hooks/useTopTracksQuery";

export default function Home() {
  const accessToken = useAccessToken();
  const {
    data: topArtists,
    isLoading: isLoadingTopArtists,
    isError: isErrorTopArtists,
    error: errorTopArtists,
  } = useTopArtistsQuery(accessToken);

  const {
    data: topTracks,
    isLoading: isLoadingTopTracks,
    isError: isErrorTopTracks,
    error: errorTopTracks,
  } = useTopTracksQuery(accessToken);

  if (isErrorTopArtists || isErrorTopTracks) {
    return (
      <div>
        {errorTopTracks?.message}
        {errorTopArtists?.message}
      </div>
    );
  }

  if (isLoadingTopArtists || isLoadingTopTracks) {
    return <TopArtistsLoading />;
  }

  console.log("Top Tracks: ", topTracks);

  return (
    <div>
      {!accessToken ? (
        <LoginWithSpotify />
      ) : (
        <div className="pb-6">
          {topArtists && <TopArtists artists={topArtists} tracks={topTracks} />}
        </div>
      )}
    </div>
  );
}
