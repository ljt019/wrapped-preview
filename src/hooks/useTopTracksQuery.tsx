import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTopTracks = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `/api/top-tracks?access_token=${accessToken}`
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top tracks", error);
    throw error;
  }
};

export function useTopTracksQuery(accessToken: string | null) {
  return useQuery({
    queryKey: ["top-tracks", accessToken],
    queryFn: () => fetchTopTracks(accessToken as string),
    enabled: !!accessToken,
  });
}
