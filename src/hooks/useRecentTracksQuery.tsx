import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchRecentTracks = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `/api/recently-played?access_token=${accessToken}`
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top artists", error);
    throw error;
  }
};

export function useRecentTracksQuery(accessToken: string | null) {
  return useQuery({
    queryKey: ["recent-tracks", accessToken],
    queryFn: () => fetchRecentTracks(accessToken as string),
    enabled: !!accessToken,
  });
}
