import React from 'react';
import { useState } from 'react';

const UploadImage = () => {
  //We will use setFileData to set data to fileData when selected
  const [fileData, setFileData] = useState('');

  //NOTE:
  //The input field does not accept a value

  //===POSTING FILE TO SERVER OPTIONS===

  //1: Automatically send when the file is selected
  const handleFileSubmit = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    //Make request to backend when file is ready

    reader.onload = async () => {
      //set the data to update the state so that we can preview it
      setFileData(reader.result);

      try {
        const res = await fetch('/api/upload-photo', {
          method: 'POST',
          body: JSON.stringify({ dataFromFile: fileData }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const fileCreated = await res.json();
        //At this point you can attach the created file to a data for example when creating/registering a user and save it to DB
        console.log(fileCreated);
      } catch (error) {}
    };
  };

  //OPTION 2:  When a button is clicked

  //1: Automatically send when the file is selected
  const sendFileUsingButtonClick = async e => {
    e.preventDefault();

    try {
      const res = await fetch('/api/upload-photo', {
        method: 'POST',
        body: JSON.stringify({ dataFromFile: fileData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const fileCreated = await res.json();
      //At this point you can attach the created file to a data for example when creating/registering a user and save it to DB
      console.log(fileCreated);
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={sendFileUsingButtonClick}>
        <h1>Upload file</h1>
        <input
          type='file'
          name='upload'
          id='file'
          onChange={handleFileSubmit}
        />
        <button type='submit'>Upload</button>
      </form>
      {/* Preview */}
      {fileData && <img style={{ width: '500px' }} src={fileData} alt='me' />}
    </div>
  );
};

export default UploadImage;
