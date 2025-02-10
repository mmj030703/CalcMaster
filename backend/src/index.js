import express from "express";
import cors from "cors";

const corsOptions = ({
    origin: ["http://localhost:5173"],
    methods: ["GET"],
    allowedHeaders: ['Content-Type']
});

const app = express();

app.listen(3000, () => {
    console.log("Successfully Listening to app at pot 3000 !");
})

app.use(cors(corsOptions));
app.use(express.json());

app.get("/get-random-values", getRandomValues);

function getRandomValues(req, res) {
    const randomValues = {
        quantity: Math.floor(Math.random() * 100),
        price: Math.floor(Math.random() * 1000),
        total: Math.floor(Math.random() * 100000),
        profit: Math.floor(Math.random() * 100)
    }

    res.status(200).send({ message: "Successfully fetched random values !", data: randomValues });
}