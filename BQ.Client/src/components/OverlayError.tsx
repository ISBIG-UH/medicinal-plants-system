import { useEffect, useRef, useState } from "react";
import { useOverlayListener } from 'primereact/hooks';

interface OverlayErrorProps {
    error: string;
    children: React.ReactNode;
}

const OverlayError: React.FC<OverlayErrorProps> = ({ error, children }) => {
    const [visible, setVisible] = useState(false);
    const targetRef = useRef(null);
    const overlayRef = useRef(null);

    const handleEvents = (event:any, options:any) => {
        if (options.valid) setVisible(false);
    };

    const [bindOverlayListener, unbindOverlayListener] = useOverlayListener({
        target: targetRef.current,
        overlay: overlayRef.current,
        listener: handleEvents,
        when: visible
    });

    useEffect(() => {
        bindOverlayListener();

        return () => {
            unbindOverlayListener();
        };
    }, [bindOverlayListener, unbindOverlayListener]);

    return (
        <div>
            <div ref={targetRef} onMouseOver={() => setVisible(true)}>
                {children}
            </div>
             {visible ? (
                <div ref={overlayRef} className="absolute bg-white border-round shadow-2 p-5 surface-overlay z-1000000 white-space-nowrap scalein origin-top">
                    Popup Content
                </div>
            ) : null}
        </div>
    );
}

export default OverlayError;