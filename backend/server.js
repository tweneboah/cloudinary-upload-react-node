require('dotenv').config();
const { cloudinary } = require('./config/cloudinary');

const express = require('express');
const app = express();

app.use(express.json({ limit: '50mb' }));

app.post('/api/upload-photo', async (req, res) => {
  try {
    //Get the form data that holds the value for the file input
    const fileData = req.body.dataFromFile;
    //Make Request to cloudinary
    const uploadedFile = await cloudinary.uploader.upload(fileData, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET, //The folder to store to
    });
    //You can send back the res
    console.log(uploadedFile);
    res.send(uploadedFile);
  } catch (error) {
    console.log(error);
  }
});

//FETCH ALL PHOTOS
app.get('/api/photos', async (req, res) => {
  const { resources } = await cloudinary.search
    .expression('folder:tutorials')
    .sort_by('public_id')
    .max_results(40)
    .execute();

  const publicIds = resources.map(file => file.public_id);
  res.send(publicIds);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
