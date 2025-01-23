/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiClient } from "./api";

//🔗 Requests Login to server
export async function apiLogin(request: LoginRequest): Promise<LoginResponse> {
  const ENDPOINT = "/login";
  console.log("apiLogin:", request);

  
  const response = {
    toastResponse: { type: "null", msg: "" },
    user: null
  };

  const requestData = {
    username: request.username,
    password: request.password,
  };

  try {
    const resp = await apiClient.post(ENDPOINT, requestData);
    
    if (resp.status == 200){
      response.user = resp.data;
      response.toastResponse.type = "success";
      response.toastResponse.msg = "Monografía añadida correctamente";
    } else if(resp.status == 403){
      response.toastResponse.type = "error";
      response.toastResponse.msg = "Credenciales incorrectas";
    }
    
  } catch (error) {
    console.error("Error in login:", error);
    response.toastResponse.type = "error";
    response.toastResponse.msg = "Inicio de sesión fallido";
  }

  console.log("Response:", response);
  return response;
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


//🔗 Gets the list of all Plant names
export async function requestAllPlantsList() : Promise<string[]>{
  const ENDPOINT = "/listplants";
  console.log("requestAllPlantNames");

  // try {
  //   const response = await apiClient.get(ENDPOINT);
  //   return response.data
  // } catch (error) {
  //   console.error("Error fetching all plants list:", error);
  //   throw error;
  // }
  return ['Abey', 'Abrojo', 'Achicoria*', 'Achicoria de cabra', 'Adormidera*', 'Agalla de costa', 'Agrimonia', 'Agrimonia*', 'Aguacate', 'Aguedita', 'Aguedita macho', 'Aguinaldo azul claro', 'Aguinaldo de Pascuas', 'Aguinaldo rosado', 'Ajenjo*', 'Ajenjo Marino*', 'Ají guaguao', 'Ajo', 'Ajonjolí', 'Alacrancillo', 'Albahaca*', 'Albahaca de clavo*', 'Albahaca morada*', 'Alcachofa*', 'Alcanfor', 'Alcaravea*', 'Algalia', 'Algarrobo de olor', 'Algodón', 'Algodón de seda', 'Alholva*', 'Alkekengi*', 'Almácigo', 'Almendro de la India', 'Altea*', 'Amansaguapo', 'Amapola*', 'Anacagüita', 'Anamú', 'Anón', 'Añil cimarrón', 'Apasote', 'Araña gato', 'Aroma amarilla', 'Aroma blanca', 'Aroma de laguna', 'Arraigán', 'Arraiján', 'Arroz', 'Artemisa*', 'Artemisa', 'Asafétida*', 'Avellano de costa', 'Avena', 'Ayúa', 'Azafrán bastardo*', 'Azafrán cimarrón', 'Azucarito', 'Bagá', 'Baobab', 'Barbesco', 'Bardana*', 'Barrilla', 'Bastón de San Francisco', 'Bejuco amargo', 'Bejuco codicia', 'Bejuco colorado', 'Bejuco de lombriz', 'Bejuco de perdiz', 'Bejuco de terciopelo', 'Bejuco de tortuga', 'Bejuco de verraco', 'Bejuco de vieja', 'Bejuco fideo', 'Bejuco guara', 'Bejuco leñatero', 'Bejuco peludo', 'Bejuco San Pedro', 'Bejuco ubí', 'Beleño*', 'Belladona*', 'Berro', 'Berro de costa', 'Bija', 'Birijí', 'Bledo blanco', 'Bledo carbonero', 'Bonete yucateco*', 'Boja', 'Boniato', 'Boniato de playa', 'Borraja*', 'Bosborín', 'Botija', 'Botón de oro', 'Brasilete', 'Brasilete falso', 'Brionia', 'Buglosa*', 'Bullón', 'Cabalonga', 'Cabellos de ángel', 'Cabo de hacha', 'Cabrito', 'Cafeto', 'Caguairán amarillo', 'Caimito', 'Caisimón', 'Caisimón de anís', 'Calabaza', 'Calaguala', 'Calaminta*', 'Caléndula*', 'Cambia voz', 'Cambustera cimarrona', 'Cambustera fina', 'Campana', 'Candelaria', 'Canela de China', 'Canutillo', 'Caña brava', 'Caña de azúcar', 'Caña de Castilla', 'Caña de limón', 'Cañafístola', 'Cañamazo amargo', 'Cañuela', 'Cañuela santa', 'Caoba', 'Capulinas', 'Cardón', 'Cardo santo', 'Cardo santo de Cuba', 'Carey', 'Carquesa', 'Cayeput*', 'Cebolleta', 'Cedro', 'Ceiba', 'Celestina azul', 'Cereza del país*', 'Cerillo de loma', 'Ciprés', 'Citronela*', 'Clavel chino', 'Clavel rojo', 'Clavellina', 'Coca', 'Cocotero', 'Cohombrillo*', 'Cojate', 'Colonia', 'Conchita azul', 'Consuelda*', 'Contraguao', 'Contra maligna', 'Copal', 'Copey', 'Copey Vera', 'Coralín', 'Coralitos', 'Cordobán', 'Cordobán arbusto', 'Corojo', 'Cortadera', 'Cuaba blanca', 'Cuabilla de costa', 'Cuajaní', 'Cuasia', 'Cubanicú', 'Cucaracha', 'Cuco', 'Culantrillo de pozo', 'Culantro*', 'Culantro cimarrón', 'Cundeamor', 'Curaboca', 'Curamagüey', 'Cúrbana', 'Curujey', 'Chamico', 'Chamico blanco', 'Chayote', 'Chicharrón', 'Chicharrón de cuabal', 'Chichicate', 'Chicle', 'Chivo', 'Dagame', 'Dalia', 'Dátil', 'Diamela', 'Dicha', 'Diente de león', 'Digital', 'Dinamita', 'Dividiví', 'Doradilla', 'Dormidera', 'Dulcamara*', 'Eclipta blanca', 'Empanadilla', 'Encina', 'Eneldo*', 'Escoba amarga', 'Escobilla', 'Escudo de La Habana', 'Espinaca de malabar', 'Espino cerval*', 'Espuela de caballero  (herbáceas)', 'Espuela de caballero  (arbusto)', 'Estragón*', 'Estrofanto*', 'Estropajo', 'Eucalipto*', 'Farolito', 'Fernandina', 'Ficus benjamina', 'Filigrana', 'Filigrana morada', 'Flor de agua', 'Flor de barbero', 'Flor de la calentura', 'Flor de muerto', 'Flor de Pascuas', 'Frailecillo cimarrón', 'Frescura', 'Fresno*', 'Frijol caballero', 'Frijol de cerca', 'Fruta bomba', 'Fustete', 'Galán de noche', 'Gallito', 'Gandul', 'Gavilán', 'Genciana de la tierra', 'Geranio manzana', 'Girasol', 'Graciola', 'Grama', 'Granado', 'Grevilea', 'Grindelia*', 'Grosella', 'Grosella china', 'Guacamaya', 'Guacamaya francesa', 'Guaco', 'Guaguasí', 'Guáimaro', 'Guajaca', 'Guamá', 'Guamá candelón', 'Guanina', 'Guao', 'Guara', 'Guásima', 'Guatemala', 'Guayaba', 'Guayacán', 'Güira cimarrona', 'Güirito de pasión', 'Güiro amargo', 'Guizazo de caballo', 'Guizazo de cochino', 'Hedyosmum', 'Helecho real', 'Hepática de las fuentes', 'Hernandia', 'Higuera', 'Higuereta', 'Hinojo*', 'Hisopo*', 'Huevo de gallo', 'Icaco', 'Ilang-Ilang*', 'Ilusión', 'Incienso', 'Inula*', 'Ipecacuana de México', 'Isbut*', 'Ítamo real', 'Jabilla', 'Jaboncillo', 'Jagua', 'Jagüey', 'Jambolán', 'Jayabacaná', 'Jayajabico', 'Jazmín del Cabo', 'Jazmín de cinco hojas', 'Jengibre*', 'Jía manzanilla', 'Jibá', 'Jícama', 'Jiquí', 'Jobo', 'Junco marino', 'Júpiter', 'Justicia', 'Lágrimas de Job', 'Laurel*', 'Laurel de la India', 'Lechuga', 'Lechuga cimarrona', 'Lengua de serpiente', 'Lengua de vaca (1)', 'Lengua de vaca (2)', 'Lentejuela', 'Leviza', 'Licopodio', 'Limón', 'Lirio de Costa', 'Lobelia', 'Llantén', 'Llantén cimarrón', 'Llerén', 'Maboa', 'Macío', 'Macuillamia', 'Macurije', 'Macusey', 'Maguey', 'Magüira', 'Maíz', 'Majagua', 'Majagua de Florida', 'Majuito', 'Malacara', 'Malagueta*', 'Malagueta', 'Malva blanca (1)', 'Malva blanca (2)', 'Malva bruja', 'Malva de caballo', 'Malva prieta', 'Malva té', 'Mamey colorado', 'Mamey de Santo Domingo', 'Mamoncillo chino', 'Manajú', 'Mangle colorado', 'Mangle prieto', 'Mango', 'Maní', 'Maní cimarrón', 'Manzanilla*', 'Manzanilla de la tierra', 'Manzanillo', 'Marabú', 'Marañón', 'Marañón de la maestra', 'Marañuela', 'Maravedí', 'Maravilla', 'Marilope', 'Maromera', 'Mar Pacífico', 'Marrubio*', 'Mastuerzo', 'Mata diabetes*', 'Mataguao', 'Mate', 'Mate de costa', 'Matemaco', 'Mazorquilla', 'Mejorana', 'Melisa*', 'Melón de agua', 'Membrillo de Bengala', 'Menta americana', 'Menta japonesa*', 'Mil flores', 'Milenrama*', 'Mirobalanos émblicos', 'Moco de pavo', 'Mora de la India', 'Moruno abey', 'Mostacilla', 'Mostaza de la tierra', 'Mostaza negra*', 'Muralla*', 'Nabaco', 'Najesi', 'Naranja agria', 'Negracuba', 'Nigua', 'Nitro', 'Nogal de la India', 'Nogal del país', 'Nuez vómica cubana', 'Ocuje', 'Ojo de Buey', 'Oldenlandia', 'Olivo bastardo', 'Ombligo de Venus', 'Oreganillo', 'Oregano*', 'Orégano cimarrón', 'Orégano francés', 'Oreja de ratón', 'Orozuz de la tierra', 'Ortiguilla*', 'Pachulí*', 'Palma alcanfor', 'Palma cana', 'Palma real', 'Palmarrosa', 'Palo amarillo', 'Palo boniato', 'Palo caballero', 'Palo campeche', 'Palo de caja', 'Palo de gallina', 'Palo de Santa María', 'Palo Guaco', 'Palo vencedor', 'Palo verraco', 'Papa', 'Papito de la reina', 'Paraíso', 'Paraíso francés', 'Pasa de negro', 'Pasionaria de cerca', 'Pelo de perro', 'Penda', 'Pendejera', 'Péndola', 'Peonía', 'Pepino cimarrón', 'Peralejo de pinares', 'Perejil', 'Perejil de playa', 'Picapica', 'Pimienta', 'Pimpinela menor*', 'Piniche', 'Pino macho', 'Piña', 'Piña de ratón', 'Piñipiñí', 'Piñón amoroso', 'Piñón botija', 'Piñuela', 'Pipa de turco', 'Piscuala', 'Pitahaya', 'Pitajoní', 'Platanillo', 'Platanillo de Cuba', 'Plátano', 'Plátano cimarrón', 'Plateado', 'Poleo*', 'Pomarrosa', 'Ponasí', 'Pringamoza**', 'Pringamoza', 'Prodigiosa', 'Quimbombó', 'Rábano rusticano*', 'Rabo de gato', 'Rabo de zorra', 'Raíz de China', 'Raíz de indio', 'Raíz de paciencia*', 'Ramón de caballo', 'Rauwolfia*', 'Real té', 'Resedá', 'Revienta caballo', 'Roble blanco', 'Roble prieto', 'Romerillo blanco', 'Romero', 'Romero de costa (1)', 'Romero de costa (2)', 'Romero falso', 'Rompe camisa macho', 'Rompezaragüey (falso)', 'Rompezaragüey (verdadero)', 'Rosa francesa', 'Ruda', 'Sábila', 'Sabina', 'Sagitaria', 'Sagú', 'Salta perico', 'Salvadera', 'Salvia de Castilla', 'Salvia de playa', 'Salvia marina', 'San Diego', 'Sanguinaria', 'Santa Bárbara', 'Santa Rita', 'Saponaria*', 'Sapote', 'Sapote blanco*', 'Sargaso común', 'Sauce', 'Saúco amarillo', 'Saúco blanco', 'Sen*', 'Sen del País', 'Seso vegetal', 'Siguaraya', 'Súcheli blanco', 'Tabaco', 'Tábano', 'Tamarindo', 'Tamarindo chino', 'Tamarindo de Puerto Rico', 'Tanaceto*', 'Tapa camino', 'Tararaco', 'Tarro de chivo', 'Tebenque (1)', 'Tebenque (2)', 'Teca', 'Tengue', 'Tibisí', 'Tila', 'Tito', 'Tomate', 'Tomillo*', 'Toronjil', 'Toronjil de menta', 'Tostón', 'Trébol de agua', 'Trébol de olor', 'Trencilla', 'Tribulillo', 'Trigo', 'Tuatúa', 'Tuna blanca', 'Tuya', 'Uña de gato (leguminosa)', 'Uña de gato (2)', 'Uva caleta', 'Vacabuey', 'Vainilla', 'Varía', 'Vejiga de perro', 'Verbena', 'Verbena cimarrona', 'Verdolaga', 'Verdolaga de playa', 'Vetiver*', 'Víbona', 'Vicaria blanca', 'Victoriana', 'Vinagrillo', 'Violeta', 'Violeta de los Alpes', 'Visnaga*', 'Vomitel', 'Yaba', 'Yabilla', 'Yáguna', 'Yaití', 'Yagruma', 'Yamagua', 'Yana', 'Yanilla blanca', 'Yanilla prieta', 'Yaya', 'Yedra', 'Yerbabuena', 'Yerba caimán', 'Yerba de cuchillo', 'Yerba de don Carlos', 'Yerba de garro', 'Yerba de Guanajay', 'Yerba de la niña (1)', 'Yerba de la niña (2)', 'Yerba de la plata', 'Yerba de la sangre', 'Yerba de la vieja', 'Yerba de la virgen de la Caridad del Cobre', 'Yerba de San Martín', 'Yerba gatera*', 'Yerba graciosa', 'Yerba hedionda', 'Yerba lombricera', 'Yerbaluisa', 'Yerba mala', 'Yerba maravedí', 'Yerba mora', 'Yerba mulata', 'Yerba porosa', 'Yuca agria', 'Yuquilla', 'Zancaraña', 'Zaragatona*', 'Zarza', 'Zarza blanca', 'Zarzaparrilla*', 'Zarzaparrilla de palito']
}



//🔗 Gets an App
export async function apiGetApp(
  request: GetAppRequest
): Promise<GetAppResponse> {
  const ENDPOINT = "/app";
  console.log("apiGetApp:", request);

  try {
    const response = await apiClient.get(`${ENDPOINT}/${request.id}`);
    return { app: response.data }
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
