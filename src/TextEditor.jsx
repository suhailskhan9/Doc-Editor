import  { useRef } from "react";
import JoditEditor from "jodit-react";

function TextEditor({ setContent }) {
  const editor = useRef(null);

  return (
    <JoditEditor ref={editor} onChange={(content) => setContent(content)} />
  );
}

export default TextEditor;