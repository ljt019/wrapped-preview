import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTopArtists = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `/api/top-artists?access_token=${accessToken}`
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top artists", error);
    throw error;
  }
};

export function useTopArtistsQuery(accessToken: string | null) {
  return useQuery({
    queryKey: ["top-artists", accessToken],
    queryFn: () => fetchTopArtists(accessToken as string),
    enabled: !!accessToken,
  });
}
