import { makeAutoObservable} from "mobx";
import * as Yup from "yup";
import { AuthRequest } from "../types/authentication";
import { IAccountService } from "../services/account-service";
import { ServiceContainer } from "../../../services/container";
import { MessageService } from "../../messages";

export interface LoginValidationResult {
    email: string;
    password: string;
    passwordConfirmation: string;
}


export class LoginComponentStore {

    accountService: IAccountService;
    messageService: MessageService;
    navigate: null | (() => void) = null;

    login: AuthRequest = { email: '', password: '', passwordConfirmation: ''};
    loginValidationSchema: any; 
    loginValidationResult: LoginValidationResult= {email: '', password: '', passwordConfirmation: ''};

    constructor(isConfirmation: boolean, messageService: MessageService, navigate: () => void ) {
        this.accountService = ServiceContainer.get(IAccountService);
        this.messageService = messageService;
        this.navigate = navigate;
        
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
            loginValidationSchema: false,
            accountService: false,
            messageService: false
            
        });
    }

    updateLoginField (key: keyof AuthRequest, value: string) {
        this.login[key] = value;
    }

    updateLoginValidationResultField(field: keyof LoginValidationResult, value: string) {
        this.loginValidationResult[field] = value;
    }

    async handleLogin () {
        this.loginValidationResult = {email: '', password: '', passwordConfirmation: ''};

        var isOK = true;

        await this.loginValidationSchema.validate(this.login, { abortEarly: false })
        .catch((err : Yup.ValidationError) => {
            isOK = false;
            if (err.inner.length > 0){
                err.inner.forEach((e:Yup.ValidationError) => {
                    this.updateLoginValidationResultField(e.path as keyof LoginValidationResult, e.message);
                });
            }
        });

        if (isOK){
            const result = await this.accountService.login(this.login, this.messageService);

            if (result.loggedUser && this.navigate != null){
                this.navigate();
            }
        }

    }

}