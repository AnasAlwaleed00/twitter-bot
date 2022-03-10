require("dotenv").config();
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;
const MONGOURI = process.env.MONGOURI;
const server = http.createServer(app);
const logic = require("./app")
const Quote = require("./QuoteModel.js");
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  express.json({
    limit: "500mb",
  })
);

app.get("/", (req, res) => {
  res.send("Hello from home");
});

app.post("/", async (req, res) => {
  const { text, song, singer, img } = req.body;
  const newQuote = await new Quote({
    text,
    song,
    singer,
  });
  newQuote.save().catch((err) => {
    return res.status(500).json({
      success: false,
      err,
    });
  });
  res.status(200).json({
    success: true,
    newQuote,
  });
});




//Database connection
mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
  })
  .then((res) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.warn(err);
  });

// CREATE SERVER
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});