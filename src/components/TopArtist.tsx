import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
}

interface TopArtistProps {
  artist: Artist;
  number: number;
}

const TopArtist: React.FC<TopArtistProps> = ({ artist, number }) => {
  const genres = artist.genres.join(", ");

  return (
    <div className="flex items-center lg:w-[25%] lg:h-[35%]">
      <Card className="w-full h-full">
        <CardHeader className="text-center">
          <CardTitle>{artist.name}</CardTitle>
          <CardDescription>{genres}</CardDescription>
        </CardHeader>
        <CardContent className="justify-center flex">
          {artist.images[0] && (
            <Image
              src={artist.images[0].url}
              alt={artist.name}
              width="175"
              height="175"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopArtist;
