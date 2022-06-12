const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());


const uri = "mongodb+srv://userclean:ttGOFlyBPOhRkzBa@cluster0.mdi6cpg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const servicesCollection = client.db("cleanCo").collection("service");

        /*
      get /get-service => all data
      post /add-service => create new data
      put /update-service => modify a data on collection
      delete /delete-service => delete a data from collection
    */

      app.get("/get-service", async (req, res) => {
        const services = await servicesCollection.find({}).toArray();
        console.log(services);
        res.send(services);
      });
  
      app.post("/add-service", async (req, res) => {
        const data = req.body;
        const result = await servicesCollection.insertOne(data);
        res.send(result);
      });

       //* With try catch block

    // app.post("/add-service", async (req, res) => {
    //   try {
    //     const data = req.body;
    //     const result = await servicesCollection.insertOne(data);
    //     res.send({ status: true, result: result });
    //   } catch (error) {
    //     res.send({ status: false, error });
    //   }
    // });
    } finally {
    }
}


run().catch(console.dir);


// Body

app.get("/dummy-route/user2", async (req, res) => {
    const data = req.body;
  
    res.json(data);
  });


// Query

app.get("/dummy-route/user", async (req, res) => {
    const { name, age } = req.query;
    console.log(name);
    console.log(age);
    res.json(name);
  });


// Param

app.get("/dummy-route/user/:id", async (req, res) => {
    const { id } = req.params;
  
    res.json(id);
  });


app.get("/", async (req, res) => {
    res.send("Hello From Clean Co site !");
});

app.listen(port, () => {
    console.log(`Clean Co server port ${port}`);
});
