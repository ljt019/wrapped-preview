import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const accessToken = req.nextUrl.searchParams.get("access_token");

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token not found" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 50, // Maximum number of items that can be retrieved
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching recently played tracks:", error);

    if (axios.isAxiosError(error)) {
      // Axios specific error
      return NextResponse.json(
        {
          error: "Failed to fetch recently played tracks",
          details: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    } else if (error instanceof Error) {
      // General error
      return NextResponse.json(
        { error: "An unknown error occurred", details: error.message },
        { status: 500 }
      );
    } else {
      // Unknown error type
      return NextResponse.json(
        { error: "An unknown error occurred", details: String(error) },
        { status: 500 }
      );
    }
  }
}
