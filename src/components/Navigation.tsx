"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const router = useRouter();
  const path = usePathname();

  const isActive = (pathname: string) => {
    return path === pathname;
  };

  return (
    <>
      <Button
        variant="link"
        className={isActive("/") ? "text-foreground" : "text-muted-foreground"}
        onClick={() => router.push("/")}
      >
        Top Artists
      </Button>
      <Button
        variant="link"
        className={
          isActive("/top-100-tracks")
            ? "text-foreground"
            : "text-muted-foreground"
        }
        onClick={() => router.push("/top-100-tracks")}
      >
        Top 100 Tracks
      </Button>
    </>
  );
}
