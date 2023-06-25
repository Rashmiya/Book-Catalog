const express = require("express");
const router = express.Router();

const db=require("../../config/db.config");
const mysql = require("mysql");
const connection = mysql.createConnection(db.database);

connection.connect(function (err){
    if(err){
        console.log(err.message);
    }else{
        console.log("connected to the mysql server");

        var bookTable =
        "CREATE TABLE IF NOT EXISTS book (book_ID INT PRIMARY KEY, book_name VARCHAR(255), book_author(255), book_price double)";

        connection.query(bookTable, function(err,result){
            if(err) throw err;
            if(result.warningCount === 0){
                console.log("book table created!");
            }
        });
    }
});

// GET ALL
router.get("/", (req,res)=>{
    var query = "SELECT * FROM book";
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.send(rows);
      });
});

// SAVE DATA
router.post("/", (req, res) => {
    const book_ID_data = req.body.book_ID;
    const book_name_data = req.body.book_name;
    const book_author_data = req.body.book_author;
    const book_price_data = req.body.book_price;
    var query =
    "INSERT INTO book (book_ID,book_name,book_author,book_price) VALUES (?,?,?,?)";
  connection.query(
    query,
    [book_ID_data, book_name_data, book_author_data, book_price_data],
    (err) => {
      if (err) {
        res.send({ message: "Error" });
      } else {
        res.send({ message: "book added" });
      }
    }
  );
});