import React from "react";

interface Props {
  name: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

function PreviewCategory({ name, children, icon }: Props) {
  return (
    <div>
      <div className="flex items-center space-x-2">
        {icon}
        <p className="text-xl font-serif font-semibold">{name}</p>
      </div>
      {children}
    </div>
  );
}

export default PreviewCategory;
