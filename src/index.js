const express = require("express");
const route=require('./routes/route')
// const bodyParser=require('body-parser')
const { default: mongoose } = require("mongoose");
const app = express();
const port = process.env.port || 3000;
app.use(express.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb+srv://mr_rupam:uttam@cluster0.eaxynkv.mongodb.net/group7Database?retryWrites=true&w=majority", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.use("/",route)

app.listen(port, (req, res) => {
  console.log(`Express is Running on ${port}`);
});
