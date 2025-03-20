const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const Message = require("./models/Message");
const connectDB = require("./config/connectDB");
const { Server } = require("socket.io");
const cors = require("cors");
const nodemailer = require("nodemailer");

const PORT = 5000;
require("dotenv").config();
const adminId = process.env.ADMIN_ID;
connectDB();

const app = express();
app.use(cors({ origin: `${process.env.FRONTEND_URI}` }));
app.use(express.json());

app.post("/send", async (req, res) => {
    try {
        const msg = req.body;
        const newMsg = new Message({
            content: msg.content,
            sender: msg.sender,
            receiver: msg.receiver,
            time: msg.time
        });
        await newMsg.save();
        res.status(200).json(newMsg);
    } catch (err) {
        res.status(400).json({ message: "Error occurred"});
    }
});

app.get("/get/:id", async (req, res) => {
    try {
        const id = req.params.id;
         
        const filter = id === adminId
            ? { $or: [{ sender: adminId }, { receiver: adminId }] }
            : { $or: [{ sender: id, receiver: adminId }, { sender: adminId, receiver: id }] };

        const messages = await Message.find(filter).sort({ time: 1 });
        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred while fetching messages" });
    }
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

app.post("/sendMail", (req, res) => {
    const { name, email, text } = req.body;
    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.ADMIN_EMAIL,
        subject: `New message from ${name}`,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({ message: "Error sending mail "});
        } else {
            res.status(200).json({ message: "Email sent successfully"});
        }
    })
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: `${process.env.FRONTEND_URI}`, methods: ["GET", "POST"] },
});

let users = {};
let isAdminActive = false;

io.on("connection", (socket) => {
    let userId = socket.handshake.query.userId;
    if (!userId) return;
 
    if (userId !== process.env.ADMIN_ID) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: "Somebody entered to your website!",
            text: ""
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error occurred", error);
            } else {
                console.log("Email sent!");
            }
        })
    }

    userId === adminId ? isAdminActive = true : "";

    users[userId] = socket.id;

    if (users[adminId]) {
        io.to(users[adminId]).emit("updateUsers", Object.keys(users));
    }

    socket.on("sendMessage", async (msg) => {
        try {
            const receiverSocketId = users[msg.receiver];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", msg);
        }

        if (!isAdminActive) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.ADMIN_EMAIL,
                subject: "Somebody sent you message!",
                text: msg.content
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error occurred", error);
                } else {
                    console.log("Email sent!", info.response);
                }
            })
        }

        } catch (err) {
            console.error(err);
        }
    });

    socket.on("disconnect", () => {
        delete users[userId];
        userId === adminId ? isAdminActive = false : "";
        io.to(users[adminId]).emit("updateUsers", Object.keys(users));
    });
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});