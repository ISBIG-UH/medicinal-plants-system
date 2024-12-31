import React from "react";

interface Props {
    label: string,
    icon: React.ReactNode,
    element: React.ReactNode,
    selector: (n: React.ReactNode) => void,
}

function SideBarItem({ label, icon, element, selector }: Props) {
  return (
    <li className="bg-gray-200 hover:bg-gray-300 m-2 p-2 rounded-lg hover:cursor-pointer" onClick={() => selector(element)}>
      <div className="flex">
        {icon}
        <p className="mx-2 font-semibold">{label}</p>
      </div>
    </li>
  );
}

export default SideBarItem;
