import axios from "axios";
import querystring from "querystring";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
            ":" +
            process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: querystring.stringify({
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  };

  try {
    const response = await axios(authOptions);
    const { access_token, refresh_token } = response.data;

    return new Response(null, {
      status: 302,
      headers: {
        Location: `/?access_token=${access_token}&refresh_token=${refresh_token}`,
      },
    });
  } catch (error) {
    return new Response("Failed to authenticate", { status: 500 });
  }
}
