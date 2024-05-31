"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const router = useRouter();

  return (
    <>
      <Button variant="link" onClick={() => router.push("/")}>
        Top Artists
      </Button>
      <Button variant="link" onClick={() => router.push("/top-100-tracks")}>
        Top 100 Tracks
      </Button>
    </>
  );
}
