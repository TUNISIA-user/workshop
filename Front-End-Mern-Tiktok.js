// add comment to video by channel
app.put("/v3/posts/:channel", async (req, res) => {
    try {
        const updatedData = await Videos.updateMany(
            { channel: req.params.channel },
            { $set: req.body }
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
