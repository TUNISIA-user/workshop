const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Initialize Socket.io

// Your existing routes (like the one you have for sending messages)
app.post("/accesMessage/:id", async (req, res) => {
    try {
        const { userId, txt } = req.body;

        // Check if the chat exists
        let isChat = await ChatTalking.findOne({
            $and: [
                { users: { $elemMatch: { $eq: req.params.id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        });

        if (isChat) {
            // If the chat exists, push the new message
            isChat.messages.push({
                senderId: userId,
                content: txt,
                timestamp: new Date()
            });
            await isChat.save();

            // Emit the new message to the other user
            io.to(req.params.id).emit('newMessage', isChat); // Send updated chat to the other user
            return res.json(isChat);
        } else {
            // Create a new chat if it doesn't exist
            const newChat = new ChatTalking({
                users: [req.params.id, userId],
                messages: [
                    { senderId: req.params.id, content: txt, timestamp: new Date() }
                ]
            });
            await newChat.save();
            io.to(req.params.id).emit('newChat', newChat); // Send new chat to the other user
            return res.json(newChat);
        }

    } catch (error) {
        console.log(`This Error by ${error}`);
        res.status(404).json({ message: error });
    }
});

// Start your server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const socket = io.connect('http://localhost:3000'); // Adjust the URL if necessary

// Listen for new messages
socket.on('newMessage', (chatData) => {
    console.log('New message received:', chatData);
    // Here you can update your chat UI with the new message
});

// Listen for new chat creation
socket.on('newChat', (chatData) => {
    console.log('New chat created:', chatData);
    // Update your chat UI with the new chat
});
