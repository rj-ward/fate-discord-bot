import { rollDice } from '../helperFunc';
const { SlashCommandBuilder } = require('discord.js');
const func = require("../helperFunc");

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
        var result = func.rollDice(modifier);
		await interaction.reply(result);
	},
};