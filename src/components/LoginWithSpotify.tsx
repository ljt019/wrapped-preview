import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function LoginWithSpotify() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <Card className="rounded-[0.5rem]">
        <CardHeader>
          <CardTitle>Login with Spotify</CardTitle>
          <CardDescription>
            To view your top artists, login with your Spotify account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginLink />
        </CardContent>
      </Card>
    </div>
  );
}

function LoginLink() {
  return (
  <Link href="/api/login">
    <Button
      className="rounded-[0.7rem] items-center flex justify-between w-full bg-black text-white"
    >
      <div style={{ flex: 1 }}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/800px-Spotify_logo_without_text.svg.png"
          alt="Spotify Logo"
          width="24"
          height="24"
        />
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        Login
      </div>
      <div style={{ flex: 1 }}></div>
    </Button>
  </Link>
  );
}

export default LoginWithSpotify;
