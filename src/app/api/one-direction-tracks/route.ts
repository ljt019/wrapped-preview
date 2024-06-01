import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const ARTIST_ID = "4AK6F7OLvEQ5QYCBNiQWHq"; // One Direction's artist ID

export async function GET(req: NextRequest) {
  const accessToken = req.nextUrl.searchParams.get("access_token");

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token not found" },
      { status: 400 }
    );
  }

  try {
    // Fetch artist albums
    const albumsResponse = await axios.get(
      `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 50, // Fetch up to 50 albums
        },
      }
    );

    const albums = albumsResponse.data.items;

    // Fetch tracks from each album
    const tracksPromises = albums.map((album: any) =>
      axios.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 50, // Fetch up to 50 tracks per album
        },
      })
    );

    const tracksResponses = await Promise.all(tracksPromises);
    const tracks = tracksResponses.flatMap((response) => response.data.items);

    // Create the final response object
    const response = {
      items: tracks,
      total: tracks.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch artist tracks" },
      { status: 500 }
    );
  }
}
