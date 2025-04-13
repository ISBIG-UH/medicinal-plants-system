import { useEffect, useRef } from 'react';
import { useEventListener } from 'primereact/hooks';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Tag } from 'primereact/tag';

interface OverlayInputErrorProps {
    error?: string;
    children: React.ReactNode;
}

const OverlayInputError: React.FC<OverlayInputErrorProps> = ({
    error,
    children,
}) => {
    const op = useRef<OverlayPanel>(null);
    const elementRef = useRef(null);

    const [bindMouseEnterListener, unbindMouseEnterListener] = useEventListener(
        {
            target: elementRef,
            type: 'mouseenter',
            listener: (e: any) => {
                if (error) op.current?.show(e, e.target);
            },
        },
    );

    const [bindMouseLeaveListener, unbindMouseLeaveListener] = useEventListener(
        {
            target: elementRef,
            type: 'mouseleave',
            listener: (e: any) => {
                if (error) op.current?.hide();
            },
        },
    );

    const [bindValueChangeListener, unbindValueChangeListener] =
        useEventListener({
            target: elementRef,
            type: 'input',
            listener: (e: any) => {
                if (error) op.current?.hide();
            },
        });

    useEffect(() => {
        bindMouseEnterListener();
        bindMouseLeaveListener();
        bindValueChangeListener();

        return () => {
            unbindMouseEnterListener();
            unbindMouseLeaveListener();
            unbindValueChangeListener();
        };
    }, [
        bindMouseEnterListener,
        bindMouseLeaveListener,
        unbindMouseEnterListener,
        unbindMouseLeaveListener,
        bindValueChangeListener,
        unbindValueChangeListener,
    ]);

    return (
        <div className="flex justify-content-end">
            <div className="w-full" ref={elementRef}>
                {children}
            </div>
            <OverlayPanel ref={op}>
                <div className="bg-red-500 text-white px-2 py-1 rounded-sm mr-2">
                    <i className="pi pi-exclamation-triangle"></i>
                </div>
                {error}
            </OverlayPanel>
        </div>
    );
};

export default OverlayInputError;
