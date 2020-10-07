import React from 'react';

import { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';

const PhotosList = () => {
  const [imageIds, setimageIds] = useState('');

  const loadImages = async () => {
    try {
      const res = await fetch('/api/photos');
      const data = await res.json();
      setimageIds(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      <h1>Photos</h1>
      {imageIds &&
        imageIds.map((imgId, idx) => (
          <Image
            key={idx}
            cloudName='tweneboah'
            publicId={imgId}
            width='300'
            width='300'
            crop='scale'
          />
        ))}
    </div>
  );
};

export default PhotosList;
