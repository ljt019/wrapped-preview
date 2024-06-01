import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchOneDirectionTracks = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `/api/one-direction-tracks?access_token=${accessToken}`
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top tracks", error);
    throw error;
  }
};

export function useOneDirectionTracksQuery(accessToken: string | null) {
  return useQuery({
    queryKey: ["one-direction-tracks", accessToken],
    queryFn: () => fetchOneDirectionTracks(accessToken as string),
    enabled: !!accessToken,
  });
}
