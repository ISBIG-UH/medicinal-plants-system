import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import React from "react";
import { useEditList } from "../hooks/useEditList";

interface Props {
  value: string[];
  setter: (s: string[]) => void;
  name: string;
  list: string[];
  icon: React.ReactNode;
  className?: string;
}

function EditListCategory({
  value,
  setter,
  name,
  list,
  icon,
  className,
}: Props) {

  const { handleChange, handleDelete, handleAdd } = useEditList(value, setter);

  return (
    <div>
      <div className="flex items-center space-x-2">
        {icon}
        <p className="text-xl font-serif font-semibold">{name}</p>
      </div>
      <div className="flex flex-col my-1 space-y-1">
        {value.length > 0 && value.map((v, i) => (
          <div key={i} className="flex space-x-2">
            <input
              type="text"
              placeholder={list[i]}
              className={`bg-gray-50 border-gray-300 flex-grow rounded-md ${className}`}
              value={v}
              onChange={(e) => handleChange(e.target.value, i)}
            />
            <button className="text-red-600 hover:text-red-800 rounded-lg" onClick={() => handleDelete(i)}>{<MdDeleteForever size={30} />}</button>
          </div>
        ))}
        {value.length === 0 && (
          <span className="text-gray-400">No hay elementos</span>
        )}
      </div>

      <button className="text-primary hover:text-green-800 h-fit rounded-lg" onClick={() => handleAdd()}>{<IoMdAddCircle size={40} />}</button>
    
    </div>
  );
}

export default EditListCategory;
