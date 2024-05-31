"use client";

import TopArtists from "../../components/TopArtists";
import { TopArtistsLoading } from "../../components/TopArtists";
import LoginWithSpotify from "../../components/LoginWithSpotify";
import { useAccessToken } from "../../hooks/useAccessToken";
import { useTopArtistsQuery } from "../../hooks/useTopArtistsQuery";
import { useTopTracksQuery } from "../../hooks/useTopTracksQuery";
import { TrackTable } from "../../components/TrackTable";
import LoadingTable from "../../components/LoadingTable";

export default function Top100Tracks() {
  const accessToken = useAccessToken();

  const {
    data: topTracks,
    isLoading: isLoadingTopTracks,
    isError: isErrorTopTracks,
    error: errorTopTracks,
  } = useTopTracksQuery(accessToken);

  if (isErrorTopTracks) {
    return <div>{errorTopTracks?.message}</div>;
  }

  if (isLoadingTopTracks) {
    return <LoadingTable />;
  }

  console.log("Top Tracks: ", topTracks);

  return (
    <div>
      {!accessToken ? (
        <LoginWithSpotify />
      ) : (
        <>
          <div className="pb-6">
            {topTracks && <TrackTable accessToken={accessToken} />}
          </div>
        </>
      )}
    </div>
  );
}
