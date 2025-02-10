import express from "express";
import cors from "cors";

const corsOptions = ({
    origin: ["http://localhost:5173", "https://calcmasterclient.onrender.com"],
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
app.get('/reload', (req, res) => { console.log("Server Reloaded") });

function getRandomValues(req, res) {
    const randomValues = {
        quantity: Math.floor(Math.random() * 100),
        price: Math.floor(Math.random() * 1000),
        total: Math.floor(Math.random() * 100000),
        profit: Math.floor(Math.random() * 100)
    }

    res.status(200).send({ message: "Successfully fetched random values !", data: randomValues });
}

////////////////////////////////////////////////////////
const url = `https://calcmaster.onrender.com/reload`;
const interval = 200000;

//Reloader Function
function reloadWebsite() {
    fetch(url)
        .then(response => {
            console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
        })
        .catch(error => {
            console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
        });
}

setInterval(reloadWebsite, interval);