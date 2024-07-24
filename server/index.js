const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

//Connect to Database
const db = require("./db");

// Models Schema
const Users = require("./db/Models/Users");
const Conversation = require("./db/Models/Conversation");
const Messages = require("./db/Models/Messages");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;

//Routes
app.get("/", (req, res) => {
  res.send("hello!");
});

app.post("/Signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(400).send("Please fill all reuired fields");
    } else {
      const emailChecker = await Users.findOne({ email: email });
      if (emailChecker) res.status(400).send("User already exist");

      const newUser = new Users({ fullName, email, password });
      bcrypt.hash(password, 10, (err, hashPassword) => {
        newUser.set("password", hashPassword);
        newUser.save();
      });

      return res.status(200).send("User registered successfully");
    }
  } catch (error) {}
});

app.post("/Signin", async (req, res) => {
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
      user: { email: user.email, fullName: user.fullName },
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

    console.log("Received userId:", userId);

    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });

    const conversationUserData = await Promise.all(
      conversations.map(async (con) => {
        const receiverId = con.members.find((member) => member !== userId);
        const user = await Users.findById(receiverId);
        return {
          user: {
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

app.get("/api/message/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;
    if (conversationId === "new") return res.status(200).json([]);
    const messages = await Messages.find({ conversationId });
    const messageUserData = Promise.all(
      messages.map(async (message) => {
        const user = await Users.findById(message.senderId);
        return {
          user: { email: user.email, fullName: user.fullName },
          message: message.message,
        };
      })
    );
    res.status(200).json(await messageUserData);
  } catch (error) {
    res.status(400).send({ Error: error });
  }
});

app.get("/api/Users", async (req, res) => {
  try {
    const users = await Users.find();
    const usersData = Promise.all(
      users.map(async (user) => {
        return {
          user: { email: user.email, fullName: user.fullName },
          userId: user._id,
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
