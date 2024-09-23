 
app.get("/callComments/:id", async (req, res) => {
    try {
        // Find the specific question by ID
        const CallAllComment = await QUESTION.findById(req.params.id);
        if (!CallAllComment) {
            return res.status(404).json({ message: "We don't have anything for this ID" });
        }

        // Find all documents in the QUESTION collection
        const allQuestions = await QUESTION.find();
        
        // Extract only the comments from all documents and flatten them into a single array
        const allComments = allQuestions.map(question => question.Comment).flat();

        // Optional: Log the flattened comments to check the output
        console.log(allComments, "<= All Comments");

        // Return the flattened array of comments
        res.status(200).json(allComments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
