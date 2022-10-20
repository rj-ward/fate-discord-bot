const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_ADDRESS,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE
  });


function createChar(name, refresh, current) {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO character (name, refresh, currentfp) VALUES (${name}, ${refresh}, ${current})`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
          return "Character created!"
        });
      });
};

function findCharID(name) {
    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT id FROM character WHERE name = ?"
        con.query(sql, [name], function (err, result) {
          if (err) throw err;
          console.log(result);
          return result[0].id
        });
      });
};

function adjustFatePoint(id, value) {
    con.connect(function(err) {
        if (err) throw err;
        var sql = "UPDATE character SET currentfp = ? WHERE id = ?";
        con.query(sql, [value, id], function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
          return "Total updated to " + value
        });
      });
};

function adjustRefresh(id, value) {
    con.connect(function(err) {
        if (err) throw err;
        var sql = "UPDATE character SET refresh = ? WHERE id = ?";
        con.query(sql, [value, id], function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
          return "Total updated to " + value
        });
      });
};

function viewFatePoints(id){
    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT currentfp FROM character WHERE name = ?"
        con.query(sql, [name], function (err, result) {
          if (err) throw err;
          console.log(result);
          return result[0].currentfp
        });
      });
};

function rollDice(modifier) {
    var total = 0;
    for (let index = 0; index < 4; index++) {
        var roll = Math.round(Math.random() * 2) - 1;
        total += roll
    };

    var result = total + modifier;
    return "Result: " + total + " + " + modifier + " = " + result + ".";
};

module.exports = { 
    createChar, 
    findCharID, 
    adjustFatePoint, 
    viewFatePoints, 
    rollDice, 
    con
}