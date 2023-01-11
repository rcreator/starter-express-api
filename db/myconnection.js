import mysql from "mysql";

export const myconnection = async () => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electrondb",
  });

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
  });
  return connection;
};
