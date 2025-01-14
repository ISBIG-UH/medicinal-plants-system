/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { apiClient } from "./api";
import { monographsSeed } from "../seed";
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
  const ENDPOINT = "/search";
  console.log("apiSearch:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const subset = getRandomSubset(monographsSeed, 6);
  const response = {
    toastResponse: { type: "null", msg: "" },
    results: subset,
  };
  /////////////////////////////////////////////////
  console.log("Response:", response);
  return response;
}

//🔗 Requests all plant names starting with a letter
export async function apiGetIndex(
  request: GetIndexRequest
): Promise<GetIndexResponse> {
  const ENDPOINT = "/index";
  console.log("apiGetIndex:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 500));
  const result = monographsSeed.map((m) => ({ id: m.id, name: m.name }));
  const response = { monographsBasics: result };
  /////////////////////////////////////////////////
  console.log("Response:", response);
  return response;
}

//🔗 Gets a monograph
export async function apiGetMonograph(
  request: GetMonographRequest
): Promise<GetMonographResponse> {
  const ENDPOINT = "/monograph";
  console.log("apiGetMonograph:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 500));
  const result = monographsSeed.find(
    (monograph) => monograph.id === request.id
  );
  if (!result) {
    throw new Error(`Monograph with ID ${request.id} not found`);
  }
  const response = { monograph: result };
  /////////////////////////////////////////////////
  console.log("Response:", response);
  return response;
}

//🔗 Posts a monograph
export async function apiAddMonograph(
  request: AddMonographRequest
): Promise<AddMonographResponse> {
  const ENDPOINT = "/monograph";
  console.log("apiAddMonograph:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let response: AddMonographResponse = {
    toastResponse: { type: "null", msg: "" },
  };
  response = {
    toastResponse: { type: "success", msg: "Monografía añadida correctamente" },
  };
  /////////////////////////////////////////////////
  console.log("Response:", response);
  return response;
}

//🔗 Puts a monograph
export async function apiEditMonograph(
  request: EditMonographRequest
): Promise<EditMonographResponse> {
  const ENDPOINT = "/monograph";
  console.log("apiEditMonograph:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let response: EditMonographResponse = {
    toastResponse: { type: "null", msg: "" },
  };
  response = {
    toastResponse: { type: "success", msg: "Monografía editada correctamente" },
  };
  /////////////////////////////////////////////////
  console.log("Response:", response);
  return response;
}

//🔗 Removes a monograph
export async function apiDeleteMonograph(
  request: DeleteMonographRequest
): Promise<DeleteMonographResponse> {
  const ENDPOINT = "/monograph";

  console.log("apiDeleteMonograph:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 3000));
  let response: EditMonographResponse = {
    toastResponse: { type: "null", msg: "" },
  };
  response = {
    toastResponse: {
      type: "success",
      msg: "Monografía eliminada correctamente",
    },
  };
  /////////////////////////////////////////////////
  console.log("Response:", response);
  return response;
}




export async function requestAppsList() : Promise<AppItem[]>{
  // const ENDPOINT = "/listapps";
  console.log("requestAppsItems");

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 300));

  return apps.map(a => ({ id: a.id, name: a.name }))
}


//🔗 Gets an App
export async function apiGetApp(
  request: GetAppRequest
): Promise<GetAppResponse> {
  const ENDPOINT = "/app";
  console.log("apiGetApp:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = { app: apps[request.id] };
  /////////////////////////////////////////////////
  console.log("Response:", response);
  return response;
}


//🔗 Puts an App
export async function apiAddApp(
  request: AddAppRequest
): Promise<AddAppResponse> {
  const ENDPOINT = "/app";
  console.log("apiAddApp:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let response: AddAppResponse = {
    toastResponse: { type: "null", msg: "" },
  };
  response = {
    toastResponse: { type: "success", msg: "Aplicación añadida correctamente" },
  };
  /////////////////////////////////////////////////
  console.log("Response:", response);
  return response;
}

//🔗 Puts an App
export async function apiEditApp(
  request: EditAppRequest
): Promise<EditAppResponse> {
  const ENDPOINT = "/app";
  console.log("apiEditApp:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let response: EditAppResponse = {
    toastResponse: { type: "null", msg: "" },
  };
  response = {
    toastResponse: { type: "success", msg: "Aplicación editada correctamente" },
  };
  /////////////////////////////////////////////////
  console.log("Response:", response);
  return response;
}

//🔗 Removes a monograph
export async function apiDeleteApp(
  request: DeleteAppRequest
): Promise<DeleteAppResponse> {
  const ENDPOINT = "/app";

  console.log("apiDeleteApp:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise((resolve) => setTimeout(resolve, 3000));
  let response: DeleteAppResponse = {
    toastResponse: { type: "null", msg: "" },
  };
  response = {
    toastResponse: {
      type: "success",
      msg: "Aplicacion eliminada correctamente",
    },
  };
  /////////////////////////////////////////////////
  console.log("Response:", response);
  return response;
}




///////////////////////////// For temporal use /////////////////////////////
function getRandomSubset(
  monographs: Monograph[],
  subsetSize: number
): Monograph[] {
  if (subsetSize < 0) {
    throw new Error("El tamaño del subconjunto no puede ser negativo.");
  }

  if (subsetSize > monographs.length) {
    throw new Error(
      "El tamaño del subconjunto no puede ser mayor que la longitud de la lista."
    );
  }

  const shuffled = [...monographs];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled.slice(0, subsetSize);
}
///////////////////////////////////////////////////////////////////////////////////////
