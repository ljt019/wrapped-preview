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
    const response1 = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 50,
          time_range: "medium_term", // last 6 months
        },
      }
    );

    const response2 = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 50,
          offset: 50,
          time_range: "medium_term", // last 6 months
        },
      }
    );

    // Combine the items from both responses into a single array
    const items = [...response1.data.items, ...response2.data.items];

    // Create the final response object
    const response = {
      items,
      // You may also want to include other properties from the responses, like `total` or `limit`
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch top tracks" },
      { status: 500 }
    );
  }
}
