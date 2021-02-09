//https://medium.com/@engross/react-quill%EC%97%90%EC%84%9C-image-upload%EC%99%80-ie-ios-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0-3a8a709ee4ae
//http://noartist.com/react%ec%9a%a9-rich-text-editor-quill-%ec%84%a4%ec%b9%98%eb%b0%8f-%ec%82%ac%ec%9a%a9-%eb%b0%a9%eb%b2%95-ajax-upload-%ea%b9%8c%ec%a7%80/
//https://www.youtube.com/watch?v=AgreDlNaUn4


import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class EditorComponent extends Component{
    constructor(props){
        super(props);
    }

    modules = {
        toolbar: [
          //[{ 'font': [] }],
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          ['clean']
        ],
      }
    
      formats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'align', 'color', 'background',        
      ]

    render(){
        const { value, onChange } = this.props;
        return(
            <div style={{height: "650px"}}>
                <ReactQuill 
                    placeholder={"내용을 입력하세요"}
                    style={{height: "600px"}} 
                    theme="snow" 
                    modules={this.modules} 
                    formats={this.formats} 
                    value={value || ''} 
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())} />
            </div>
        )
    }
    
}
export default EditorComponent