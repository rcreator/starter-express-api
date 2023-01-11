const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const product = require("./routers/product");
const dealer = require("./routers/dealers");

const app = express();
const port = process.env.PORT || 9000;
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.use("/v1", product);
app.use("/v1", dealer);

app.listen(port);
