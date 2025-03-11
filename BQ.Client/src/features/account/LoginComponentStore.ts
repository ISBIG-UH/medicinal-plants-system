import { makeAutoObservable, toJS } from "mobx";
import * as Yup from "yup";
import { Login } from "./login";

export interface LoginValidationResult {
    email: string;
    password: string;
    passwordConfirmation: string;
}


export class LoginComponentStore {

    login: Login = { email: '', password: '', passwordConfirmation: ''};
    loginValidationSchema: any; 
    loginValidationResult: LoginValidationResult= {email: '', password: '', passwordConfirmation: ''};

    constructor(isConfirmation: boolean) {

        this.loginValidationSchema = Yup.object().shape({
                email: isConfirmation? 
                    Yup.string() : 
                    Yup.string()
                        .trim()
                        .email("Por favor, introduzca un correo electrónico válido")
                        .required("Por favor, introduzca su correo electrónico"),
                password: isConfirmation ? 
                    Yup.string()
                        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "La contraseña debe ser fuerte")
                        .required("Por favor, introduzca su contraseña"):
                    Yup.string()
                        .required("Por favor, introduzca su contraseña"),
                passwordConfirmation: isConfirmation ? 
                    Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben de coincidir')
                        .required("Por favor, introduzca su contraseña") :
                    Yup.string()
            });

        makeAutoObservable(this, {
            loginValidationSchema: false
        });
    }

    updateLoginField (key: keyof Login, value: string) {
        this.login[key] = value;
    }

    updateLoginValidationResultField(field: keyof LoginValidationResult, value: string) {
        this.loginValidationResult[field] = value;
    }

    async handleLogin () {
        this.loginValidationResult = {email: '', password: '', passwordConfirmation: ''};
        await this.loginValidationSchema.validate(this.login, { abortEarly: false })
        .then((value:any) => {
            console.log("call login service");
        })
        .catch((err : Yup.ValidationError) => {
            if (err.inner.length > 0){
                err.inner.forEach((e:Yup.ValidationError) => {
                    this.updateLoginValidationResultField(e.path as keyof LoginValidationResult, e.message);
                });
            }
        });
    }

}