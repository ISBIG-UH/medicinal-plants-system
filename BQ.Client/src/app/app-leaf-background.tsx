import { Button } from 'primereact/button';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';

const LeafBackground: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen bg-leaf-wall">
            <div className="p-2 flex justify-end">
                <Button
                    aria-label="Go to home"
                    icon="pi pi-home"
                    rounded
                    onClick={() => navigate('/')}
                ></Button>
            </div>
            <div className="flex justify-center items-center grow">
                {children}
            </div>
        </div>
    );
};

export default LeafBackground;
