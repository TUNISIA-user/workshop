// add comment to video by channel
app.put("/v3/posts/:66da38171f2ca5641beb0783", async (req, res) => {
    try {
        const updatedData = await Videos.updateMany(
            { channel: req.params.id },
            { $set: req.body } // i wanna here specif storage in section comment like this 
            // comments : [
              'text : "should be like this this comment",
              "_id" : and here for sure we wanna pass id user do comment to this post 
            do you see my logique good ?
            ]
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
