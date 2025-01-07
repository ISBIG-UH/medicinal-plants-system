import React from "react";

interface Props {
    label: string,
    icon: React.ReactNode,
    element: React.ReactNode,
    selector: (n: React.ReactNode) => void,
}

function SideBarItem({ label, icon, element, selector }: Props) {
  return (
    <li className="bg-gray-300 overflow-hidden lg:bg-gray-200 hover:bg-gray-400 lg:hover:hover:bg-gray-300 m-1 p-2 rounded-lg hover:cursor-pointer" onClick={() => selector(element)}>
      <div className="flex overflow-hidden">
        {icon}
        <p className="mx-2 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{label}</p>
      </div>
    </li>
  );
}

export default SideBarItem;
