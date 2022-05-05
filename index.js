const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// this is middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nmmj7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db("f2c-store").collection("service");
    const myItemCollection = client.db("f2c-store").collection("myItem");

      app.get("/service", async (req, res) => {
        const email = req.query.email;
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
      
      app.get('/service/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const service = await serviceCollection.findOne(query);
          res.send(service)
      })
      app.get('/service', async (req, res) => {
          const email = req.query.email;
          console.log(email)
          const query = {email:email};
          const cursor = myItemCollection.find(query);
          const added = await cursor.toArray();
          res.send(added)
})
      app.post('/service', async (req, res) => {
          const newItem = req.body;
          const result = await serviceCollection.insertOne(newItem);
          res.send(result);
      })

      app.put('/service/:id', async (req, res) => {
          const id = req.params.id;
          const updateService = req.body;
          const filter = { _id: ObjectId(id) };
          const options = { upsert: true };
          const updateServiceDoc = {
              $set: {
                  name: updateService.name,
                  description: updateService.description,
                  quantity: updateService.quantity,
                  price: updateService.price,
                  img:updateService.img
              }
          }
          const result = await serviceCollection.updateOne(filter, updateServiceDoc, options);
          res.send(result);
      })

      app.delete('/service/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const result = await serviceCollection.deleteOne(query);
          res.send(result);
      })
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My f&c Stock server is ok");
});

app.listen(port, () => {
  console.log("my f&C server running port", port);
});
