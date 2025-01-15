interface Props {
    icon: React.ReactNode;
    className: string;
}

function HRIcon({ className, icon }: Props) {
  return (
    <div className={`flex flex-row justify-center ${className}`}>
      <div className="w-full">
        <div className="border-b border-b-gray-400 h-3" />
      </div>
      <div className="mx-2">
        {icon}
      </div>
      <div className="w-full">
        <div className="border-b border-b-gray-400 h-3" />
      </div>
    </div>
  );
}

export default HRIcon;