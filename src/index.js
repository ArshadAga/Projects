const express = require("express");
// const bodyParser=require('body-parser')
const { default: mongoose } = require("mongoose");
const app = express();
const port = process.env.port || 3000;
app.use(express.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.listen(port, (req, res) => {
  console.log(`Express is Running on ${port}`);
});
