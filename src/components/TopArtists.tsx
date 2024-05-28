import React from "react";
import TopArtist from "./TopArtist";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
}

interface TopArtistsProps {
  artists: Artist[];
}

const TopArtists: React.FC<TopArtistsProps> = ({ artists }) => {
  return (
    <div>
      <h2 className="text-2xl text-center py-4">Top 5 Artists</h2>
      <div className="gap-y-4 flex flex-col items-center">
        {artists.map((artist, index) => (
          <TopArtist key={artist.id} artist={artist} number={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
