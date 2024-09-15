#Install Required Packages: First, install the required Node.js packages, including Multer, Mongoose, and GridFS related packages.
---------------------------------------------------------------------------------------------------
#npm install multer mongoose gridfs-stream
#npm install @mongodb/gridfs-stream --save

---------------------------------------------------------------------------------------------------
#Set Up MongoDB Connection: Set up a connection to your MongoDB instance using Mongoose.

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const mongoURI = 'mongodb://localhost:27017/tiktokClone'; // Replace with your MongoDB URI

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Initialize GridFS
let gfs;
conn.once('open', () => {
  // Initialize stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Collection where files will be stored
});

# Configure Multer for GridFS Storage: You can use Multer to handle file uploads and store them directly into MongoDB using GridFS.

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// Create a storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: file.originalname, // You can customize the file naming here
      bucketName: 'uploads', // Collection name
    };
  },
});

const upload = multer({ storage });


#const express = require('express');
const app = express();

// POST /upload: Upload a video
app.post('/upload', upload.single('video'), (req, res) => {
  res.status(200).json({ file: req.file });
});

# Retrieve Uploaded Videos: To retrieve and stream the uploaded videos from MongoDB 

// GET /video/:filename: Stream a video by filename
app.get('/video/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }

    // Check if it's a video
    if (file.contentType === 'video/mp4' || file.contentType === 'video/mkv') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({ err: 'Not a video file' });
    }
  });
});


