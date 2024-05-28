import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Code not found" }, { status: 400 });
  }

  console.log("Authorization code:", code);
  console.log("Redirect URI:", process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI);

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
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

    console.log("Access token:", access_token);
    console.log("Refresh token:", refresh_token);

    const redirectUrl = new URL("/", req.nextUrl.origin);
    redirectUrl.searchParams.set("access_token", access_token);
    redirectUrl.searchParams.set("refresh_token", refresh_token);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Error authenticating with Spotify:", getErrorMessage(error));
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    // Axios error
    return error.response?.data
      ? JSON.stringify(error.response.data)
      : error.message;
  } else if (error instanceof Error) {
    // Native error
    return error.message;
  } else {
    // Unknown error
    return String(error);
  }
}
