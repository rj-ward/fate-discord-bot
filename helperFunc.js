const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Character = sequelize.define('character', {
	id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
		type: Sequelize.STRING,
		unique: true,
	},
	refresh: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
  currentfp: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	}
}, {
  tableName: 'character'
});


async function createChar(name, refresh, current) {
    const newChar = await Character.create({ name: name, refresh: refresh, currentfp: current, createdAt: Date.now(), updatedAt: Date.now()});
    console.log("Jane's auto-generated ID:", newChar.id);
    return newChar.name + " has been created!"
};
/* 
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
 */
module.exports = { 
    createChar, 
    // findCharID, 
    // adjustFatePoint, 
    // viewFatePoints, 
    // rollDice, 
    // con
}