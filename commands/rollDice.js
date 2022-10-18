const { SlashCommandBuilder } = require('discord.js');

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