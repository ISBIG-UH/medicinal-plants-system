export function useEditList(value: string[], setter: (s: string[]) => void) {
  const handleChange = (newValue: string, i: number) => {
    const newList = [...value];
    newList[i] = newValue;
    setter(newList);
  };

  const handleDelete = (i: number) => {
    const newList = [...value];
    newList.splice(i, 1);
    setter(newList);
  };

  const handleAdd = () => {
    const newList = [...value];
    newList.push("");
    setter(newList);
  };

  return { handleChange, handleDelete, handleAdd };
}
