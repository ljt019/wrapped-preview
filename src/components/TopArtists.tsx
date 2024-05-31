import React from "react";
import TopArtist from "./TopArtist";
import LoadingCard from "./LoadingCard";
import type { Artist, Track } from "@/types/types";

interface TopArtistsProps {
  artists: Artist[];
  tracks: Track[];
}

const TopArtists: React.FC<TopArtistsProps> = ({ artists, tracks }) => {
  return (
    <div>
      <div className="flex flex-col py-4 text-center">
        <h2 className="text-2xl">Wrapped Preview</h2>
        <h1 className="text-xs text-muted-foreground">
          Top 5 Artists since January
        </h1>
      </div>
      <div className="gap-y-4 flex flex-col items-center">
        {artists.map((artist) => (
          <TopArtist key={artist.id} artist={artist} tracks={tracks} />
        ))}
      </div>
    </div>
  );
};

export function TopArtistsLoading() {
  return (
    <div>
      <div className="flex flex-col py-4 text-center">
        <h2 className="text-2xl">Wrapped Preview</h2>
        <h1 className="text-xs text-muted-foreground">
          Top 5 Artists since January
        </h1>
      </div>
      <div className="gap-y-4 flex flex-col items-center">
        {[1, 2, 3, 4, 5].map((index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default TopArtists;
