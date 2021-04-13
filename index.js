const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello Working from Database");
});

// MongoDB
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7ajpn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("doctorsPortal").collection("appointments");
  // create
  app.post("/addAppointment", (req, res) => {
    const appointment = req.body;
    console.log(appointment);
    collection.insertOne(appointment).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  // read date from body
  app.post("/appointmentByDate", (req, res) => {
    const date = req.body;
    console.log(date.date);
    collection.find({ date: date.date }).toArray((err, documents) => {
      res.send(documents);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.listen(process.env.PORT || port);
