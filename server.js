const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const client = require("socket.io").listen(4000).sockets;
// const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;

// Eventually put this in ./config/keys.js URI env variable
// DB config
const db = "mongodb://localhost/chatfast";

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("chat message", msg => {
    io.emit("chat message", msg);
    // console.log("message: " + msg);
  });

  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  // });
  /*
  let chat = db.collections("chats");

  // Create function to send status
  sendStatus = s => {
    socket.emit("status", s);
  };

  // Get chats from mongo collection
  chat
    .find()
    .limit(100)
    .sort({ _id: 1 })
    .toArray((err, result) => {
      if (err) throw err;

      // Emit messages
      socket.emit("output", result);
    });

  // Handle input events
  io.on("input", data => {
    let name = data.name;
    let message = data.message;

    // Check for name and message
    if (name == "" || message == "") {
      // Send err status
      sendStatus("Please enter a name and message");
    } else {
      // Insert message
      chat.insert({ name: name, message: message }, () => {
        client.emit("output", [data]);
        // Send message sent
        sendStatus({
          message: "Message sent",
          clear: true
        });
      });
    }
  });

  // Handle clear
  socket.on("clear", () => {
    // Remove all chats from collection
    chat.remove({}, () => {
      // Emit cleared
      socket.emit("cleared");
    });
  });
  */
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index2.html");
  // res.send("Hello World");
});

// Will want this when you have the client built
// app.use(express.static("client/build"));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Server running on port ${port}`));
