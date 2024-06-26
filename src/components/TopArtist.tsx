import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import type { Artist, Track } from "@/types/types";

interface TopArtistProps {
  artist: Artist;
  tracks: Track[];
}

const TopArtist: React.FC<TopArtistProps> = ({ artist, tracks }) => {
  const genres = artist.genres.join(", ");

  // Find tracks by the current artist
  const artistTracks = tracks.filter((track) => {
    const match = track.artists.some(
      (artistObj) => artistObj.name === artist.name
    );
    console.log(
      "Artist:",
      artist.name,
      "Track artists:",
      track.artists.map((artistObj) => artistObj.name),
      "Match:",
      match
    );
    return match;
  });

  // Get the first 3 tracks that match the artist
  const top3Tracks = artistTracks.slice(0, 3);

  return (
    <div className="flex items-center justify-center w-[80%] lg:w-[25%] lg:h-[35%]">
      <Card className="h-full w-full rounded-[0.5rem]">
        <CardHeader className="text-center">
          <CardTitle>{artist.name}</CardTitle>
          <CardDescription>{genres}</CardDescription>
        </CardHeader>
        <CardContent className="justify-center flex">
          {artist.images[0] && (
            <div>
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                width="250"
                height="250"
                className="rounded-[0.5rem]"
                priority={true}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="text-center flex flex-col items-center justify-center">
          {top3Tracks.length > 0 ? (
            <>
              <ul className="text-muted-foreground text-sm">
                {top3Tracks.map((track) => (
                  <li key={track.id}>{track.name}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>No tracks found</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TopArtist;
