//https://medium.com/@engross/react-quill%EC%97%90%EC%84%9C-image-upload%EC%99%80-ie-ios-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0-3a8a709ee4ae
//http://noartist.com/react%ec%9a%a9-rich-text-editor-quill-%ec%84%a4%ec%b9%98%eb%b0%8f-%ec%82%ac%ec%9a%a9-%eb%b0%a9%eb%b2%95-ajax-upload-%ea%b9%8c%ec%a7%80/

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react';

class MyComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = { text: '' } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
    }
   
    handleChange(value) {
      this.setState({ text: value })
    }
   
    render() {
      return (
        <ReactQuill value={this.state.text}
                    onChange={this.handleChange} />
      )
    }
  }

  export default MyComponent;