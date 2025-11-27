const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middlewares
app.use(express.json());
app.use(cors());

const port = 9000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@bruce.s9kj5xo.mongodb.net/?appName=Bruce`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const db = client.db("elearn");
    const courseCollection = db.collection("courses");

    app.get("/courses", async (req, res) => {
      const result = await courseCollection.find().toArray();
      res.send(result);
    });
    // api to get single course data for details page 
    app.get("/courses/:id", async (req, res) => {
      const id = req.params.id;
      const result = await courseCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });
// api to add new courses to existing collection and show on ui 
    app.post('courses', async (req, res)=>{
      const body = req.body 
      const result = await courseCollection.insertOne(body)
      res.send(result)
    })



    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  const result = "Hello world";
  res.send(result);
});

app.listen(port, () => {
  console.log(`elearn server running on port ${port}`);
});
