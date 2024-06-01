"use client";
import { useState, useEffect } from "react";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useTopTracksQuery } from "@/hooks/useTopTracksQuery";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import type { Track } from "@/types/types";

export default function GuessTheSong() {
  const accessToken = useAccessToken();
  const {
    data: topTracks,
    isLoading: isLoadingTopTracks,
    isError: isErrorTopTracks,
  } = useTopTracksQuery(accessToken);

  const [trackGuess, setTrackGuess] = useState<string>("");
  const [randomTrack, setRandomTrack] = useState<Track | null>(null);
  const [randomTrackIndex, setRandomTrackIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (topTracks && topTracks.length > 0) {
      pickRandomTrack();
    }
  }, [topTracks]);

  const pickRandomTrack = () => {
    const index = Math.floor(Math.random() * topTracks.length);
    setRandomTrack(topTracks[index]);
    setRandomTrackIndex(index + 1); // +1 to make the position 1-based
    setTrackGuess("");
    setIsCorrect(null);
  };

  const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrackGuess(event.target.value);
    if (isCorrect !== null) {
      setIsCorrect(null); // Reset the input border color to normal
    }
  };

  const handleGuessSubmit = () => {
    if (
      randomTrack &&
      trackGuess.toLowerCase() === randomTrack.name.toLowerCase()
    ) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    pickRandomTrack();
  };

  if (isLoadingTopTracks) {
    return <div>Loading...</div>;
  }

  if (isErrorTopTracks) {
    return <div>Error loading top tracks.</div>;
  }

  return (
    <div className="flex justify-center items-center pt-[6rem]">
      {randomTrack && randomTrackIndex !== null && (
        <div className="w-[80%] lg:w-[25%] lg:h-[35%]">
          <Card className="h-full w-full rounded-[0.5rem]">
            <CardHeader className="text-center">
              <CardTitle>Guess the Song</CardTitle>
              <CardDescription>
                Try to guess the name of the song!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {randomTrack.preview_url && (
                <audio controls>
                  <source src={randomTrack.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 justify-center items-center">
              <Input
                type="text"
                value={trackGuess}
                onChange={handleGuessChange}
                placeholder="Enter your guess"
                className={`w-2/3 rounded-[0.5rem] ${
                  isCorrect === true
                    ? "border-green-500"
                    : isCorrect === false
                    ? "border-red-500"
                    : ""
                }`}
                disabled={isCorrect === true}
              />
              {isCorrect ? (
                <Button
                  onClick={handleReset}
                  className="rounded-[0.5rem] w-1/2"
                >
                  Reset
                </Button>
              ) : (
                <Button
                  onClick={handleGuessSubmit}
                  className="rounded-[0.5rem] w-1/2"
                >
                  Submit Guess
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
