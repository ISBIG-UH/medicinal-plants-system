import { useEditText } from "../hooks/useEditText";

interface Props {
  value: string;
  setter: (s: string) => void;
  name: string;
  text: string;
  icon: React.ReactNode;
  className?: string;
  simple?: boolean
}

function EditTextCategory({ value, setter, name, text, icon, className="", simple=false }: Props) {

  const { textareaRef } = useEditText(text, setter);

  return (
    <div>
      {!simple && <div className="flex items-center space-x-2">
        {icon}
        <p className="text-xl font-serif font-semibold">{name}</p>
      </div>}
      {simple && <input
        type="text"
        placeholder={text}
        className={`mb-2 w-full bg-gray-50 border-gray-300 rounded-md ${className}`}
        value={value}
        onChange={(e) => setter(e.target.value)}
      />}
      {!simple && <textarea
        ref={textareaRef}
        placeholder={text}
        className={`w-full bg-gray-50 border-gray-300 rounded-md resize-none ${className}`}
        value={value}
        onChange={(e) => setter(e.target.value)}
        style={{ height: 'auto', overflow: 'hidden' }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = 'auto';
          target.style.height = `${target.scrollHeight}px`;
        }}
      />}
    </div>
  );
}

export default EditTextCategory;
