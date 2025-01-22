/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiClient } from "./api";
import { apps } from "./apps";

//🔗 Requests Login to server
export async function apiLogin(request: LoginRequest): Promise<LoginResponse> {
  const ENDPOINT = "/login";
  console.log("apiLogin:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const isValidUser =
    request.username === "Admin" && request.password === "password";
  if (isValidUser) {
    return {
      toastResponse: { type: "success", msg: "Inicio de sesión exitoso" },
      user: {
        username: "Admin",
        role: "Administrador",
        sessionToken: "este-es-el-token-de-sesion",
      },
    };
  } else {
    return {
      toastResponse: {
        type: "error",
        msg: "Nombre de usuario o contraseña incorrectos",
      },
      user: null,
    };
  }
  ////////////////////////////////////////////////
}

//🔗 Requests search results based in a query
export async function apiSearch(
  request: SearchRequest
): Promise<SearchResponse> {
  const ENDPOINT = "search/plants";
  console.log("apiSearch:", request);

  const query = request.input;

  const response = {
    toastResponse: { type: "null", msg: "" },
    results: [],
  };

  try {
    const resp = await apiClient.get(ENDPOINT, {
      params: { query },
    });

    response.results = resp.data;

  } catch (error) {
    console.error("Error fetching plants:", error);
    throw error;
  }
  console.log("Response:", response);
  return response;
}

//🔗 Requests all plant names starting with a letter
export async function apiGetIndex(
  request: GetIndexRequest
): Promise<GetIndexResponse> {
  const ENDPOINT = "/index";
  console.log("apiGetIndex:", request);

  const letter = request.letter;

  const response = {
    monographsBasics: [],
  };

  try {
    const resp = await apiClient.get(`${ENDPOINT}/${letter}`);
    response.monographsBasics = resp.data;

  } catch (error) {
    console.error("Error fetching plants:", error);
    throw error;
  }
  
  console.log("Response:", response);
  return response;
}

//🔗 Gets a monograph
export async function apiGetMonograph(
  request: GetMonographRequest
): Promise<GetMonographResponse> {
  const ENDPOINT = "/monograph";
  console.log("apiGetMonograph:", request);

  const response = {
    monograph: emptyMonograph
  }

  try {
    const resp = await apiClient.get(`${ENDPOINT}/${request.id}`);
    response.monograph = resp.data;

  } catch (error) {
    console.error("Error fetching monograph:", error);
    throw error;
  }

  console.log("Response:", response);
  return response;
}

//🔗 Posts a monograph
export async function apiAddMonograph(
  request: AddMonographRequest
): Promise<AddMonographResponse> {
  const ENDPOINT = "/monograph";
  console.log("apiAddMonograph:", request);

  const response = {
    toastResponse: { type: "null", msg: "" },
  };

  const requestData = {
    ...request.formData,
    id: 0,
  };

  try {
    await apiClient.post(ENDPOINT, requestData);
    response.toastResponse.type = "success";
    response.toastResponse.msg = "Monografía añadida correctamente";

  } catch (error) {
    console.error("Error adding monograph:", error);
    response.toastResponse.type = "error";
    response.toastResponse.msg = "No se pudo añadir la monografía";
    throw error;
  }

  console.log("Response:", response);
  return response;
}

//🔗 Puts a monograph
export async function apiEditMonograph(
  request: EditMonographRequest
): Promise<EditMonographResponse> {
  const ENDPOINT = "/monograph";
  console.log("apiEditMonograph:", request);

  const id = request.id;
  const response = {
    toastResponse: { type: "null", msg: "" },
  };

  const requestData = {
    ...request.formData,
    id
  };

  try {
    await apiClient.put(ENDPOINT, requestData);
    response.toastResponse.type = "success";
    response.toastResponse.msg = "Monografía editada correctamente";

  } catch (error) {
    console.error("Error editing monograph:", error);
    response.toastResponse.type = "error";
    response.toastResponse.msg = "No se pudo editar la monografía";
    throw error;
  }

  console.log("Response:", response);
  return response;
}

//🔗 Removes a monograph
export async function apiDeleteMonograph(
  request: DeleteMonographRequest
): Promise<DeleteMonographResponse> {
  const ENDPOINT = "/monograph";
  console.log("apiDeleteMonograph:", request);

  const response = {
    toastResponse: { type: "null", msg: "" },
  };

  try {
    await apiClient.delete(`${ENDPOINT}/${request.id}`);
    response.toastResponse.type = "success";
    response.toastResponse.msg = "Monografía eliminada correctamente";
  } catch (error) {
    console.error("Error deleting monograph:", error);
    response.toastResponse.type = "error";
    response.toastResponse.msg = "No se pudo eliminar la monografía";
    throw error;
  }

  console.log("Response:", response);
  return response;
}



//🔗 Gets the list of all App names
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


//🔗 Gets an App
export async function apiGetApp(
  request: GetAppRequest
): Promise<GetAppResponse> {
  const ENDPOINT = "/app";
  console.log("apiGetApp:", request);

  try {
    const response = await apiClient.get(`${ENDPOINT}/${request.id}`);
    return { app: response.data}
  } catch (error) {
    console.error("Error fetching app:", error);
    throw error;
  }
}


//🔗 Adds an App
export async function apiAddApp(
  request: AddAppRequest
): Promise<AddAppResponse> {
  const ENDPOINT = "/app";
  console.log("apiAddApp:", request);

  const response = {
    toastResponse: { type: "null", msg: "" },
  };

  const requestData = {
    ...request.formData,
    id: 0,
  };

  try {
    await apiClient.post(ENDPOINT, requestData);
    response.toastResponse.type = "success";
    response.toastResponse.msg = "Aplicación añadida correctamente";

  } catch (error) {
    console.error("Error adding app:", error);
    response.toastResponse.type = "error";
    response.toastResponse.msg = "No se pudo añadir la aplicación";
    throw error;
  }

  console.log("Response:", response);
  return response;
}

//🔗 Puts an App
export async function apiEditApp(
  request: EditAppRequest
): Promise<EditAppResponse> {
  const ENDPOINT = "/app";
  console.log("apiEditApp:", request);


  const id = request.id;
  const response = {
    toastResponse: { type: "null", msg: "" },
  };

  const requestData = {
    ...request.formData,
    id
  };

  try {
    await apiClient.put(ENDPOINT, requestData);
    response.toastResponse.type = "success";
    response.toastResponse.msg = "Aplicación editada correctamente";

  } catch (error) {
    console.error("Error editing app:", error);
    response.toastResponse.type = "error";
    response.toastResponse.msg = "No se pudo editar la aplicación";
    throw error;
  }

  console.log("Response:", response);
  return response;
}

//🔗 Removes an App
export async function apiDeleteApp(
  request: DeleteAppRequest
): Promise<DeleteAppResponse> {
  const ENDPOINT = "/app";
  console.log("apiDeleteApp:", request);

  const response = {
    toastResponse: { type: "null", msg: "" },
  };

  try {
    await apiClient.delete(`${ENDPOINT}/${request.id}`);
    response.toastResponse.type = "success";
    response.toastResponse.msg = "Aplicación eliminada correctamente";
  } catch (error) {
    console.error("Error deleting app:", error);
    response.toastResponse.type = "error";
    response.toastResponse.msg = "No se pudo eliminar la aplicación";
    throw error;
  }

  console.log("Response:", response);
  return response;
}




//////////////////////////////////////////////////////////////////////////////////////
const emptyMonograph: Monograph = {
  id: 0,
  name: "",
  genus: "",
  subsp: "",
  f: "",
  species: "",
  authors: "",
  family: "",
  var: "",
  subfamily: "",
  sy: [],
  vul: [],
  hab: "",
  des: "",
  cmp: "",
  use: "",
  pro: "",
  app: "",
  cul: "",
  bib: [],
};
///////////////////////////////////////////////////////////////////////////////////////
