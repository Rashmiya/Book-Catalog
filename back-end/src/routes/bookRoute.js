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

