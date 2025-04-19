import React from 'react';

interface DetailsSectionProps {
    name: string;
    children: React.ReactNode;
    icon: React.ReactNode;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({
    name,
    children,
    icon,
}) => {
    return (
        <div className="font-quicksand">
            <div className="flex items-center space-x-2">
                {icon}
                <p className="text-xl font-sniglet font-semibold">{name}</p>
            </div>
            {children}
        </div>
    );
};

export default DetailsSection;
