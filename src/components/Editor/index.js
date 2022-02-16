import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const Editor = ({ initialContent = "", onChange }) => {
  // const [content, setContent] = useState(initialContent);
  const opt = {
    buttonList: [
      // default
      // ['undo', 'redo'],
      ['bold', 'underline', 'italic', 'list', 'fontColor', 'hiliteColor', 'align', 'blockquote'],
      ['table', 'link', 'image'],
      ['fullScreen']
    ]
  }
  return (
    <div>
      <SunEditor
        autoFocus={false}
        width="100%"
        height="150px"
        setOptions={opt}
        setContents={initialContent}
        onChange={onChange}
      />
      {/* preview <div>{content}</div> */}
    </div>
  );
};

export default Editor
