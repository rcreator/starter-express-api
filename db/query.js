const myconnection = require("./myconnection");

const my_getProducts = async () => {
  return myconnection().then((res) => {
    const myresult = (resp) => {
      return resp.query(
        "SELECT * FROM `products`",
        function (error, results, fields) {
          if (error) {
            throw false;
          }
          return results;
        }
      );
    };

    myresult(res).then((resul) => console.log(resul));
  });
};

module.exports = my_getProducts;
