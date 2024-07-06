import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { uploadFile } from './services/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef();

  useEffect(() => {
    const uploadImage = async () => {
      if (file) {
        setUploading(true);
        setProgress(0);
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        
        try {
          const response = await uploadFile(data, updateProgress);
          console.log(response);
          setResult(response.path);
        } catch (error) {
          console.error("Upload failed:", error);
        } finally {
          setUploading(false);
        }
      }
    };
    uploadImage();
  }, [file]);

  const updateProgress = (event) => {
    const percentage = Math.round((event.loaded * 100) / event.total);
    setProgress(percentage);
  };

  const onUploadClick = () => {
    fileInput.current.click();
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share your files with just a link!</p>
        <button onClick={onUploadClick} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <input
          type='file'
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        
        {result && <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>}
      </div>
    </div>
  );
}

export default App;
