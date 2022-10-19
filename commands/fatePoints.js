const { SlashCommandBuilder } = require('discord.js');
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


module.exports = {
	data: new SlashCommandBuilder()
		.setName('createchar')
		.setDescription('Register a new character.')
        .addStringOption(option =>
			option
				.setName('charname')
				.setDescription('Character Name')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('refresh')
                .setDescription('Refresh value for the character')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('current')
                .setDescription('Current number of Fate points for the character')
                .setRequired(true))
        ,
	async execute(interaction) {
        const modifier = interaction.options.getNumber('modifier');
        var result = rollDice(modifier);
		await interaction.reply(result);
	},

    data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls 4dF with a modifier!')
        .addNumberOption(option =>
			option
				.setName('modifier')
				.setDescription('The modifier to the roll.')),
	async execute(interaction) {
        const modifier = interaction.options.getNumber('modifier');
        var result = rollDice(modifier);
		await interaction.reply(result);
	},
};