const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

//Connect to Database
const db = require("./db");


// Models Schema
const Users = require("./db/Models/Users");
const Conversation = require("./db/Models/Conversation");
const Messages = require("./db/Models/Messages");

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;

//Routes
app.get("/", (req, res) => {
  res.send("hello!");
});

app.post("/api/Signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(400).json({ error: "Please fill all reuired fields" });
    } else {
      const emailChecker = await Users.findOne({ email: email });
      if (emailChecker) res.status(400).json({ error: "User already exist" });

      const newUser = new Users({ fullName, email, password });
      bcrypt.hash(password, 10, (err, hashPassword) => {
        newUser.set("password", hashPassword);
        newUser.save();
      });

      return res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.post("/api/Signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).send("Enter all Credentials");

    const user = await Users.findOne({ email });
    if (!user) res.status(400).send("Invalid Credentials");

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) res.status(400).send("Invalid Credentials");

    const payload = {
      userId: user._id,
      email: user.email,
    };

    const JWT_Screte = process.env.JWT_Screte || "Secrete";
    jwt.sign(payload, JWT_Screte, { expiresIn: 84600 }, async (err, token) => {
      await Users.updateOne(
        { _id: user._id },
        {
          $set: { token },
        }
      );
      user.save();
    });
    res.status(200).json({
      user: { id: user._id, email: user.email, fullName: user.fullName },
      token: user.token,
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/api/conversation", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    await newConversation.save();
    res.status(200).send("Conversation created Successfully");
  } catch (error) {
    res.status(400).send("Error", error);
  }
});

app.get("/api/getConversation/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });

    const conversationUserData = await Promise.all(
      conversations.map(async (con) => {
        const receiverId = con.members.find((member) => member !== userId);
        const user = await Users.findById(receiverId);
        return {
          user: {
            receiverId: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          conversationId: con._id,
        };
      })
    );

    res.status(200).json(conversationUserData);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.post("/api/message", async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = "" } = req.body;
    if (!senderId || !message)
      return res.status(400).send("Please fill all required fields");
    if (!conversationId && receiverId) {
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });
      await newConversation.save();
      const newMessage = new Messages({
        conversationId: newConversation._id,
        senderId,
        message,
      });
      await newMessage.save();
      return res.status(200).send("Message sent successfully");
    } else if (!conversationId && !receiverId) {
      res.status(400).send("Please fill all required fields");
    }
    const newMessage = new Messages({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).send("Message sent successfully");
  } catch (error) {
    res.status(400).send({ Error: error });
  }
});

app.get("/api/message/:conversationId?", async (req, res) => {
  try {
    const checkMessages = async (conversationId) => {
      const messages = await Messages.find({ conversationId });
      const messageUserData = await Promise.all(
        messages.map(async (message) => {
          const user = await Users.findById(message.senderId);
          return {
            user: { id: user._id, email: user.email, fullName: user.fullName },
            message: message.message,
          };
        })
      );
      return messageUserData;
    };

    const conversationId = req.params.conversationId;

    const checkConversation = await Conversation.find({
      members: { $all: [req.query.senderId, req.query.receiverId] },
    });

    if (checkConversation.length > 0) {
      const messagesData = await checkMessages(checkConversation[0]._id);
      return res.status(200).json(messagesData);
    } else {
      const conversationExists = await Conversation.findById(conversationId);
      if (!conversationExists) {
        return res.status(404).send({ Error: "Conversation not found" });
      }
      const messagesData = await checkMessages(conversationId);
      return res.status(200).json(messagesData);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send({ Error: error.message });
  }
});

app.get("/api/Users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const users = await Users.find({ _id: { $ne: id } });
    const usersData = Promise.all(
      users.map(async (user) => {
        return {
          user: {
            email: user.email,
            fullName: user.fullName,
            userId: user._id,
          },
        };
      })
    );
    res.status(200).json(await usersData);
  } catch (error) {
    res.status(400).send({ Error: error });
  }
});

app.listen(PORT, () => {
  console.log("Application running on PORT", PORT);
});
