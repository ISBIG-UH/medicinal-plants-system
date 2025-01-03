import { useEffect, useRef } from "react";


export function useEditText(text: string, setter: (s: string) => void) {
  
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      setter(text);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { textareaRef };
}