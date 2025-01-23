import { useState } from "react";

export function useFormData(initialData: { [key: string]: string | string[] }) {
  const [formData, setFormData] = useState<{
    [key: string]: string | string[];
  }>(initialData);

  const clearInputs = () => {
    setFormData(initialData);
  }

  const handleFormTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.startsWith(" ")) {
      e.target.value = e.target.value.trim();
    }
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFormListChange = (id: string, index: number, value: string) => {
    setFormData((prevData) => {
      const updatedList = Array.isArray(prevData[id]) ? [...prevData[id]] : [];
      updatedList[index] = value;
      return {
        ...prevData,
        [id]: updatedList,
      };
    });
  };

  function handleAddListItem(id: string) {
    setFormData((prevData) => {
      const updatedList = Array.isArray(prevData[id]) ? [...prevData[id]] : [];
      updatedList.push("");
      return {
        ...prevData,
        [id]: updatedList,
      };
    });
  }

  function handleAddListDropdownItem(id: string, defaultValue: string) {
    setFormData((prevData) => {
      const updatedList = Array.isArray(prevData[id]) ? [...prevData[id]] : [];
      updatedList.push(defaultValue);
      return {
        ...prevData,
        [id]: updatedList,
      };
    });
  }

  function handleDeleteListItem(id: string, index: number) {
    setFormData((prevData) => {
      const updatedList = Array.isArray(prevData[id]) ? [...prevData[id]] : [];
      updatedList.splice(index, 1);
      return {
        ...prevData,
        [id]: updatedList,
      };
    });
  }

  return {
    formData,
    handleFormTextChange,
    handleFormListChange,
    handleAddListItem,
    handleAddListDropdownItem,
    handleDeleteListItem,
    clearInputs,
  };
}
