import { ReactNode } from 'react';
import { RefObject } from 'react';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { ToastMessageService } from '../classes/toast-message-service';
import MessageServiceContext from '../classes/message-service.context';

interface ToastMessageServiceProviderProps {
    children: ReactNode;
}

const ToastMessageServiceProvider = ({
    children,
}: ToastMessageServiceProviderProps) => {
    const toast: RefObject<Toast | null> = useRef<Toast>(null);
    const messageService = new ToastMessageService(toast);

    return (
        <MessageServiceContext.Provider value={{ messageService }}>
            <Toast ref={toast}></Toast>
            {children}
        </MessageServiceContext.Provider>
    );
};

export default ToastMessageServiceProvider;
