import { monographsSeed } from "../seed";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { apiClient } from "./api";

export async function apiLogin(request: LoginRequest): Promise<LoginResponse> {
  console.log("apiLogin");
  console.log("Request:", request);

  //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
  /////                CODE HERE               /////
  /////////////////////////////////////////////////
  await new Promise(resolve => setTimeout(resolve, 1000));
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

export async function apiSearch(request: SearchRequest): Promise<SearchResponse> {
    console.log("apiSearch");
    console.log("Request:", request);
    
    //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
    /////                CODE HERE               /////
    /////////////////////////////////////////////////
    await new Promise(resolve => setTimeout(resolve, 1000));
    const subset = getRandomSubset(monographsSeed, 6);
    const response = { toastResponse: { type: "null", msg: ""}, results: subset }
    /////////////////////////////////////////////////
    console.log("Response:", response);
    return response;
}

export async function apiGetIndex(request: GetIndexRequest) : Promise<GetIndexResponse> {
    console.log("apiGetIndex");
    console.log("Request:", request);
    
    //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
    /////                CODE HERE               /////
    /////////////////////////////////////////////////
    await new Promise(resolve => setTimeout(resolve, 500));
    const result = monographsSeed.map((m) => ({ id: m.id, name: m.name }))
    const response = { monographsBasics: result }
    /////////////////////////////////////////////////
    console.log("Response:", response);
    return response
}

export async function apiGetMonograph(request: GetMonographRequest) : Promise<GetMonographResponse> {
    console.log("apiGetMonograph")
    console.log("Request:", request);

    //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
    /////                CODE HERE               /////
    /////////////////////////////////////////////////
    await new Promise(resolve => setTimeout(resolve, 500));
    const result = monographsSeed.find(monograph => monograph.id === request.id);
    if (!result) {throw new Error(`Monograph with ID ${request.id} not found`);}
    const response = { monograph: result }
    /////////////////////////////////////////////////
    console.log("Response:", response);
    return response;
}

export async function apiAddMonograph(request: AddMonographRequest) : Promise<AddMonographResponse> {
    console.log("apiAddMonograph")
    console.log("Request:", request);

    //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
    /////                CODE HERE               /////
    /////////////////////////////////////////////////
    await new Promise(resolve => setTimeout(resolve, 500));
    let response: AddMonographResponse = { toastResponse: { type: "null", msg: "" } }
    response = { toastResponse: { type: "success", msg: "Monografía añadida correctamente" } }
    /////////////////////////////////////////////////
    console.log("Response:", response);
    return response;
}

export async function apiEditMonograph(request: EditMonographRequest) : Promise<EditMonographResponse> {
    console.log("apiEditMonograph")
    console.log("Request:", request);

    //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
    /////                CODE HERE               /////
    /////////////////////////////////////////////////
    await new Promise(resolve => setTimeout(resolve, 500));
    let response: EditMonographResponse = { toastResponse: { type: "null", msg: "" } }
    response = { toastResponse: { type: "success", msg: "Monografía editada correctamente" } }
    /////////////////////////////////////////////////
    console.log("Response:", response);
    return response;
}

export async function apiDeleteMonograph(request: DeleteMonographRequest) : Promise<DeleteMonographResponse> {
    console.log("apiDeleteMonograph")
    console.log("Request:", request);

    //////// 🚨🚨Implementar solicitud🚨🚨 ///////////
    /////                CODE HERE               /////
    /////////////////////////////////////////////////
    await new Promise(resolve => setTimeout(resolve, 500));
    let response: EditMonographResponse = { toastResponse: { type: "null", msg: "" } }
    response = { toastResponse: { type: "success", msg: "Monografía eliminada correctamente" } }
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
