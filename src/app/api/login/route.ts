import querystring from "querystring";

export async function GET(req: Request) {
  const scope = "user-read-private user-read-email user-top-read";
  const redirectUri =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
    });

  return new Response(null, {
    status: 302,
    headers: { Location: redirectUri },
  });
}
