const bodyParser = require("body-parser");
const express = require("express");
const myconnection = require("../db/myconnection");

const router = express.Router();
router.use(bodyParser.json());

router.post("/products", (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    if (data) {
      myconnection()
        .then((connect) => {
          var subquery = [];
          const mtRows = data.rows;
          for (let i = 0; i < mtRows.length; i++) {
            subquery.push(
              `('${mtRows[i].item_code}','${mtRows[i].item_name}','${mtRows[i].price}','${mtRows[i].quantity}','${mtRows[i].dealer}','${mtRows[i].creator}')`
            );
          }
          subquery = subquery.join(",");
          const query =
            "INSERT INTO `products`(`item_code`, `item_name`, `price`, `quantity`, `dealer`, `creator`) VALUES " +
            subquery;
          console.log(query);
          connect.query(query, function (error, results) {
            if (error) {
              res.status(500).send({
                success: false,
                message: "Something went wrong",
              });
            }

            res.status(200).send({
              success: true,
              message: "Product Created Successfully",
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

router.get("/products", (req, res) => {
  try {
    myconnection()
      .then((connect) => {
        const sqlquery =
          "SELECT item_code,item_name,price,quantity,creator,dlr.name as dealer FROM `products` pr LEFT JOIN `dealers` dlr on pr.dealer = dlr.id";
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
            message: "Product Data",
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

router.delete("/products/:id", (req, res) => {
  try {
    myconnection()
      .then((connect) => {
        var user_id = req.params["id"];
        const sqlquery = "DELETE FROM `products` WHERE id='" + user_id + "'";
        connect.query(sqlquery, function (error) {
          if (error) {
            res.status(500).send({
              success: false,
              message: "Something went wrong",
            });
          }
          res.status(200).send({
            success: true,
            message: "Record Deleted Successfully",
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

module.exports = router;
