import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface TopArtistsProps {
  artists: Artist[];
}

const TopArtists: React.FC<TopArtistsProps> = ({ artists }) => {
  return (
    <div>
      <h2>Top 5 Artists:</h2>
      <ol>
        {artists.map((artist) => (
          <li key={artist.id}>
            <Card>
              <CardHeader>
                <CardTitle>{artist.name}</CardTitle>
                <CardDescription>1000 Hours Listened</CardDescription>
              </CardHeader>
              <CardContent>
                {artist.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    width="50"
                    height="50"
                  />
                )}
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopArtists;
