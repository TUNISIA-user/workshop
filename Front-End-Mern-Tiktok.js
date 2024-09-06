$push: This is the MongoDB operator used to append values to an array.
    
app.put("/v3/posts/:id",asyncHandler(async(req,res,next)=>{
    const Data = await  Videos.findById(req.params.id)
    console.log(Data)
    res.send(Data)
}))



funnny mistake 
{
    "text": "This is my comment",
    "userId": "64fcb35a012e3a4e34f9810b"   
}
   const updatedData = await Videos.updateOne(
            { _id: req.params.id },
            { $push: { comments: { text : text, user: user, createdAt: new Date() } } }
            
        );

comments : [
{
    "text": "This is my comment",                   // i was like this send the data
    "userId": "64fcb35a012e3a4e34f9810b"   
}                                                   

]






const video = await Videos.findById(videoId).populate('comments.user', 'name');  // 'name' is the field you want to fetch from the User model

this is joinutre i search for it 

using midlle
// add this library its awsome 
//
npm i react-toastify
<pre>
 
      import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  function App(){
    const notify = () => toast("Wow so easy!");

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer /> // should be this evey time put in bootom 
     
      </div>
    );
  }


    </pre>

// --------------------------------------------
app.put("/v3/posts/:channelId", async (req, res) => {
    try {
        // Extract channel ID and comment details from the request
        const { channelId } = req.params; // destraction
        const { text, userId } = req.body;

        // Update the video with the specified channel by adding a new comment
        const updatedData = await Videos.updateMany(
            { channel: channelId },
            { $push: { comments: { text, user: userId, createdAt: new Date() } } } // Add comment with text and user ID
        );

        if (updatedData.matchedCount === 0) {
            return res.status(404).json({ message: "No data found for this channel" });
        }

        res.status(200).json({ message: "Data updated successfully", updatedCount: updatedData.modifiedCount });
    } catch (err) {
        console.error(`Error updating data: ${err.message}`);
        res.status(500).json({ message: "Error updating data", error: err });
    }
});

app.put("/v3/posts/:id", async (req, res) => {
    try {
        // Extract comment details from the request body
        const { text, userId } = req.body;

        // Update the video (or post) with the specified id by adding a new comment
        const updatedData = await Videos.updateOne(
            { _id: req.params.id }, // Find the video (or post) with the matching ID
            { $push: { comments: { text, user: userId, createdAt: new Date() } } } // Push new comment into the "comments" array
        );

        // Check if the update was successful
        if (updatedData.nModified === 1) {
            res.status(200).json({ message: "Comment added successfully", updatedData });
        } else {
            res.status(404).json({ message: "Post not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});


//  add comment  by one  user 

// here i think should be work with local host 

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));                

app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));
 this to access any origin to work in requests metohde
