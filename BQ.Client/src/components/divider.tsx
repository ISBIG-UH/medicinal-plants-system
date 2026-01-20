interface DividerProps {
    children: React.ReactNode;
    className?: string;
}

const Divider: React.FC<DividerProps> = ({ className, children }) => {
    return (
        <div className={`flex flex-row justify-center ${className}`}>
            <div className="w-full">
                <div className="border-b border-b-gray-400 h-3" />
            </div>
            <div className="mx-2">{children}</div>
            <div className="w-full">
                <div className="border-b border-b-gray-400 h-3" />
            </div>
        </div>
    );
};

export default Divider;
