import bodyParser from "body-parser";
import express from "express";
import { myconnection } from "../db/myconnection.js";

const router = express.Router();
router.use(bodyParser.json());

router.get("/dealers", (req, res) => {
  try {
    myconnection()
      .then((connect) => {
        const sqlquery = "SELECT * FROM `dealers`";
        connect.query(sqlquery, function (error, results) {
          if (error) {
            res.status(500).send({
              success: false,
              message: "Something went wrong",
            });
          }
          res.status(200).send({
            success: true,
            data: results,
            message: "Dealers Data",
          });
        });
      })
      .catch(() =>
        res.status(500).send({
          success: false,
          message: "Something went wrong",
        })
      );
  } catch {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.post("/dealer", (req, res) => {
  try {
    const data = req.body;
    if (data) {
      myconnection()
        .then((connect) => {
          const mtRows = `('${data.name}','${data.address}','${data.email}','${data.mobile}')`;
          const query =
            "INSERT INTO `dealers`(`name`, `address`, `email`, `mobile`) VALUES " +
            mtRows;
          connect.query(query, function (error, results) {
            if (error) {
              res.status(500).send({
                success: false,
                message: "Something went wrong",
              });
            }

            res.status(200).send({
              success: true,
              message: "Dealer Created Successfully",
              data: results,
            });
          });
        })
        .catch(() => {
          res.status(500).send({
            success: false,
            message: "Something went wrong",
          });
        });
    } else {
      res.status(500).send({
        success: false,
        message: "Please enter valid datials",
      });
    }
  } catch {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default router;
