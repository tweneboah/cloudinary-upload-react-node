import React from 'react';
import logo from './logo.svg';
import './App.css';
import UploadImage from './components/UploadImage';
import PhotosList from './components/PhotosList';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <UploadImage />
        <PhotosList />
      </header>
    </div>
  );
}

export default App;
