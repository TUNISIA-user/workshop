// add comment to video by channel


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
        <ToastContainer />
      </div>
    );
  }


    </pre>

// 
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
