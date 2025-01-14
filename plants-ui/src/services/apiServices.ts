import { apiClient } from "./api";
import { apps } from "./apps";


export async function requestAppsList() : Promise<AppItem[]>{
    // const ENDPOINT = "/listapps";
    console.log("requestAppsItems");
  
    //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
    /////                CODE HERE               /////
    /////////////////////////////////////////////////
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    return apps.map(a => ({ id: a.id, name: a.name }))
  }
  
  export async function requestApp(i: number) : Promise<App>{
    // const ENDPOINT = "/listapps";
    console.log("requestApp", i);
  
    //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
    /////                CODE HERE               /////
    /////////////////////////////////////////////////
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    return apps[i]
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
  