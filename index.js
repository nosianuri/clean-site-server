const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`Ami Dowracchi port ${port}`);
});
