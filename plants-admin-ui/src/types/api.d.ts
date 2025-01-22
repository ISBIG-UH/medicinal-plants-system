interface LoginRequest {
  username: string;
  password: string;
}
interface LoginResponse {
  toastResponse: ToastResponse;
  user: User | null;
}

interface SearchRequest {
  input: string;
}
interface SearchResponse {
  toastResponse: ToastResponse;
  results: Monograph[];
}

interface GetIndexRequest {
  letter: string,
}
interface GetIndexResponse {
  monographsBasics: MonographBasic[];
}

interface GetMonographRequest {
  id: number;
}
interface GetMonographResponse {
  monograph: Monograph;
}

interface AddMonographRequest {
  formData: { [key: string]: string | string[] };
}
interface AddMonographResponse {
  toastResponse: ToastResponse;
}

interface EditMonographRequest {
  formData: { [key: string]: string | string[] };
  id: number;
}
interface EditMonographResponse {
  toastResponse: ToastResponse;
}

interface DeleteMonographRequest {
  id: number;
}
interface DeleteMonographResponse {
  toastResponse: ToastResponse;
}

interface GetAppRequest {
  id: number;
}
interface GetAppResponse {
  app: App;
}

interface AddAppRequest {
  formData: { [key: string]: string | string[] };
}
interface AddAppResponse {
  toastResponse: ToastResponse;
}

interface EditAppRequest {
  formData: { [key: string]: string | string[] };
}
interface EditAppResponse {
  toastResponse: ToastResponse;
}

interface DeleteAppRequest {
  id: number;
}
interface DeleteAppResponse {
  toastResponse: ToastResponse;
}