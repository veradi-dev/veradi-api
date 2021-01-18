import Editor from './EditorComponent';
import React,{useState} from 'react';
const Noticecreate = () => {
    const [desc, setDesc] = useState('');
    function onEditorChange(value) {
        setDesc(value)
    }
    
    return (
        <div>
          <Editor value={desc} onChange={onEditorChange} />
        </div>
    )
};

export default Noticecreate;