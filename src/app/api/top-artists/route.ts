import axios from "axios";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const accessToken = url.searchParams.get("access_token");

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 5,
          time_range: "medium_term", // last 6 months
        },
      }
    );

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch top artists", { status: 500 });
  }
}
