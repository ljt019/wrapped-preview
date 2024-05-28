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
}

const TopArtist: React.FC<TopArtistProps> = ({ artist }) => {
  const genres = artist.genres.join(", ");

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
      </Card>
    </div>
  );
};

export default TopArtist;
