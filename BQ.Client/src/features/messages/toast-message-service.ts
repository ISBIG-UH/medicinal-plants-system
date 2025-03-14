import { MessageService } from "./message-service";
import { RefObject } from "react";
import { Toast } from "primereact/toast";
import { Message } from "./message";

export class ToastMessageService implements MessageService {
    toast : RefObject<Toast | null>;

    constructor(toast : RefObject<Toast | null>) {
        this.toast = toast;
    }

    show(message: Message): void {
        this.toast.current?.show(message);
    }
}