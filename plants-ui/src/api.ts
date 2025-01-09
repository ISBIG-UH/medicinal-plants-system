import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function searchQuery(query: string) {
  try {
    const response = await apiClient.get("search/plants", {
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
