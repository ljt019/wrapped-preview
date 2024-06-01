"use client";
import { useState, useEffect, useRef } from "react";
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
import { Pause, Play } from "lucide-react";

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
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
    setIsPlaying(false);
    setCurrentTime(0);
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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, [randomTrack]);

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;
      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime);
        if (audioElement.currentTime >= 5) {
          audioElement.pause();
          audioElement.currentTime = 0;
          setIsPlaying(false);
        }
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [audioRef, randomTrack]);

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
                <div>
                  <audio ref={audioRef} style={{ display: "none" }}>
                    <source src={randomTrack.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={handlePlayPause}
                      className="rounded-[0.5rem] mt-2"
                      variant="ghost"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </Button>
                    <div className="mt-2 w-full flex items-center justify-center">
                      <div className="w-full bg-gray-300 h-2 rounded">
                        <div
                          className="bg-blue-500 h-2 rounded"
                          style={{ width: `${(currentTime / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">
                        {Math.floor(currentTime)}/5s
                      </span>
                    </div>
                  </div>
                </div>
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
