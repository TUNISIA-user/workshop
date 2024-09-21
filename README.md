  
# workshop
this workshop its place to fix all repostry in my account *

<pre>   

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import Grid from "gridfs-stream";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;
const mongoURI = process.env.BASEURL;

// MongoDB connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const conn = mongoose.connection;
let gfs, gridfsBucket;

conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads",
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});

// GridFS Storage setup
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: "uploads", // Set bucket name
        };
    },
});
const upload = multer({ storage });

// Middleware setup
app.use(express.json());
app.use(cors({ origin: process.env.ORIGINDOMAIN }));

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json({ file: req.file });
});

// Get all files
app.get("/files", (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({ err: "No files exist" });
        }
        return res.status(200).json(files);
    });
});

// Get a single file by filename
app.get("/files/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ err: "No file exists" });
        }
        return res.status(200).json(file);
    });
});

// Stream file content (image preview)
app.get("/image/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ err: "No file exists" });
        }
        if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
            const readstream = gridfsBucket.openDownloadStreamByName(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ err: "Not an image" });
        }
    });
});

// Delete a file
app.delete("/files/:id", (req, res) => {
    gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err.message });
        }
        res.status(200).json({ message: "File deleted successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
</pre>
