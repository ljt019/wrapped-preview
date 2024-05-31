import React from "react";
import { useTopTracksQuery } from "@/hooks/useTopTracksQuery";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Track } from "@/types/types";

export function TrackTable({ accessToken }: { accessToken: string }) {
  const { data: tracks, isLoading, isError } = useTopTracksQuery(accessToken);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tracks.</div>;
  }

  return (
    <Table>
      <TableCaption>A list of your top tracks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Artists</TableHead>
          <TableHead>Album</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tracks.map((track: Track, index: number) => (
          <TableRow key={track.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{track.name}</TableCell>
            <TableCell>
              {track.artists.map((artist) => artist.name).join(", ")}
            </TableCell>
            <TableCell>{track.album.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
