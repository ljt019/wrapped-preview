import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Code not found" }, { status: 400 });
  }

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
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

    const redirectUrl = new URL("/", req.nextUrl.origin);
    redirectUrl.searchParams.set("access_token", access_token);
    redirectUrl.searchParams.set("refresh_token", refresh_token);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
