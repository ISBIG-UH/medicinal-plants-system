import { apiClient } from "./api";


export async function requestAppsList() : Promise<AppItem[]>{
  const ENDPOINT = "/listapps";
  console.log("requestAppsItems");

  try {
    const response = await apiClient.get(ENDPOINT);
    return response.data
  } catch (error) {
    console.error("Error fetching apps list:", error);
    throw error;
  }
}

export async function requestApp(i: number) : Promise<App>{
  const ENDPOINT = "/app";
  console.log("apiGetApp:", i);

  try {
    const response = await apiClient.get(`${ENDPOINT}/${i}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching app:", error);
    throw error;
  }
}
  
  
  
export async function searchQuery(query: string) : Promise<Monograph[]> {
  const ENDPOINT = "search/plants";
  try {
    const response = await apiClient.get(ENDPOINT, {
      params: { query },
    });

    // Map response to my types
    return response.data;

  } catch (error) {
    console.error("Error fetching plants:", error);
    throw error;
  }
}
