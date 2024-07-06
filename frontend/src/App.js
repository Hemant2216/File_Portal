import React from 'react'
import { useRef, useState,useEffect } from 'react';
import './App.css';
import { uploadFile } from './services/api';


function App () {
  const [file,setFile]=useState('');
  const [result,setResult]=useState('');
  const fileInput=useRef();
  useEffect(()=>{
    const getImage=async()=>{
      if(file){
        const data=new FormData();
        data.append("name",file.name);
        data.append("file",file);
        let response=await uploadFile(data);
        console.log(response);
        setResult(response.path);
      }
    }
    getImage()
  },[file])
  const onUploadClick=()=>{
    fileInput.current.click();
  }
  return (
    <div className='container'>
      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share your files with just a link!</p>
        <button onClick={()=> onUploadClick()}>Upload</button>
        <input type='file'
          ref={fileInput}
          style={{display:'none'}}
          onChange={(e)=>setFile(e.target.files[0])}
        />
        <a href={result} target="_blank">{result}</a>
      </div>
    </div>
  )
}

export default App
