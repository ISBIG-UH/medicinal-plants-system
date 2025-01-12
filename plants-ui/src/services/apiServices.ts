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
  
  
  
  export async function searchQuery(query: string) {
    const ENDPOINT = "search/plants";
    try {
      const response = await apiClient.get(ENDPOINT, {
        params: { query },
      });
  
      // Map response to my types
      const mapped = response.data.map((item: SearchResponseItem) => mapSearchResponseItem_Monograph(item))
      return mapped;
  
    } catch (error) {
      console.error("Error fetching plants:", error);
      throw error;
    }
  }
  
  function mapSearchResponseItem_Monograph(data: SearchResponseItem): Monograph{
      return {
          Id: 1,
          Name: data.name,
          genus: data.monograph.genus,
          species: data.monograph.species,
          authors: data.monograph.authors,
          var: data.monograph.var,
          subsp: data.monograph.subsp,
          f: data.monograph.f,
          family: data.monograph.family,
          subfamily: data.monograph.subfamily,
          Sy: data.monograph.sy,
          Vul: data.monograph.vul,
          Hab: data.monograph.hab,
          Des: data.monograph.des,
          Cmp: data.monograph.cmp,
          Use: data.monograph.use,
          Pro: data.monograph.pro,
          App: data.monograph.app,
          Cul: data.monograph.cul,
          Bib: data.monograph.bib
      }
  }
  