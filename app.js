var cron = require("node-cron");
const Twit = require("twit");
const dotenv = require("dotenv");
dotenv.config();

const Quote = require("./QuoteModel.js");

const T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

cron.schedule("*/10 * * * *", () => {
  getRandomQuote();
});

const getRandomQuote = async () => {
  const randomQuote = await Quote.aggregate([
    {
      $sample: {
        size: 1,
      },
    },
  ]);
  tweet(randomQuote[0].text);
};

const tweet = (text) => {
  const onFinish = (err, reply) => {
    if (err) {
      console.log("Error: ", err.message);
    } else {
      console.log("Success: ", reply);
    }
  };

  T.post("statuses/update", { status: text }, onFinish);
};
