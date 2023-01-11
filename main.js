import express from "express";
import cors from "cors";
import product from "./routers/product.js";
import dealer from "./routers/dealers.js";
import bodyParser from "body-parser";

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
