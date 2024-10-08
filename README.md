#t  
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

------------------



const arr = [
    {
        "_id": "66f4a095f54761701ea2d817",
        "users": [
            "66f449941b650cdfeb352c84",
            "66f4702f1b650cdfeb352dad"
        ],
        "messages": [
            {
                "senderId": "66f449941b650cdfeb352c84",
                "content": "hello im  admin",
                "timestamp": "2024-09-25T23:45:25.131Z",
                "_id": "66f4a095f54761701ea2d818"
            }
            // ... other messages
        ],
        "__v": 4
    },
    {
        "_id": "66f4a54a0c97781fbcdc7c52",
        "users": [
            "66f4702f1b650cdfeb352dad",
            "66f336aaed298464128bd198"
        ],
        "messages": [
            {
                "senderId": "66f4702f1b650cdfeb352dad",
                "content": "hello im test Nahdi i reponse you bro",
                "timestamp": "2024-09-26T00:05:30.504Z",
                "_id": "66f4a54a0c97781fbcdc7c53"
            }
        ],
        "__v": 0
    },
    {
        "_id": "66f4a58e0c97781fbcdc7c62",
        "users": [
            "66f4702f1b650cdfeb352dad",
            "66f44bd31b650cdfeb352ce8"
        ],
        "messages": [
            {
                "senderId": "66f4702f1b650cdfeb352dad",
                "content": "hello im test Nahdi i reponse you author",
                "timestamp": "2024-09-26T00:06:38.053Z",
                "_id": "66f4a58e0c97781fbcdc7c63"
            }
            // ... other messages
        ],
        "__v": 1
    }
];

// Specify the user ID of the currently logged-in user
const currentUserId = "66f4702f1b650cdfeb352dad"; // Replace this with the logged-in user's ID

// Create an array to hold the IDs of users the specified user is talking with
const talkingWith = [];

// Filter the array to get all chat objects containing the specified user ID
const matchedChats = arr.filter(chat => chat.users.includes(currentUserId));

// Extract the other users from each matched chat
matchedChats.forEach(chat => {
    chat.users.forEach(user => {
        if (user !== currentUserId) { // Ensure we don't include the current user ID
            talkingWith.push(user);
        }
    });
});

// Remove duplicates (if necessary) and display the result
const uniqueTalkingWith = [...new Set(talkingWith)]; // Removes duplicates

// Display the users in conversation with the current user
console.log(`User ID: ${currentUserId} is talking with:`);
if (uniqueTalkingWith.length > 0) {
    console.log(uniqueTalkingWith.join('\n'));
} else {
    console.log("No users found.");
}

 [...new Set(talkingWith)] // this awsome idea


