const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173", "https://calcmasterclient.onrender.com"],
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/get-random-values", getRandomValues); // Correct path

function getRandomValues(req, res) {
  const randomValues = {
    quantity: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 1000),
    total: Math.floor(Math.random() * 100000),
    profit: Math.floor(Math.random() * 100),
  };

  res.status(200).send({
    message: "Successfully fetched random values !",
    data: randomValues,
  });
}

exports.handler = async (event, context) => {
  const server = app.listen(0);
  return new Promise((resolve, reject) => {
    server.on('listening', () => resolve({ statusCode: 200, body: JSON.stringify({ message: 'Backend started' }) }));
    server.on('error', error => reject({ statusCode: 500, body: JSON.stringify({ error: error.message }) }));
  });
};