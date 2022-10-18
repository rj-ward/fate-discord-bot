const { SlashCommandBuilder } = require('discord.js');

function rollDice(modifier) {
    var total = 0;
    for (let index = 0; index < 4; index++) {
        var roll = round(random() * 2) - 1;
        total += roll
    };

    var result = total + modifier;
    return "Result: " + total + " + " + modifier + " = " + result + ".";
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};