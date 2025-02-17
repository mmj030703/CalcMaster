const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

// CORS Configuration
const corsOptions = {
  origin: [
    process.env.CLIENT_URL || "http://localhost:5173",
    "https://calcmasterclient.onrender.com"
  ],
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

// API Route
router.get("/get-random-values", (req, res) => {
  const randomValues = {
    quantity: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 1000),
    total: Math.floor(Math.random() * 100000),
    profit: Math.floor(Math.random() * 100),
  };

  res.status(200).json({
    message: "Successfully fetched random values!",
    data: randomValues,
  });
});

// Export Netlify Handler
app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
