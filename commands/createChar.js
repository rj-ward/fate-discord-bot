const { SlashCommandBuilder } = require('discord.js');
const func = require("../helperFunc")

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
        await interaction.deferReply();
        const name = interaction.options.getString('charname');
        const refresh = interaction.options.getNumber('refresh');
        const currentfp = interaction.options.getNumber('current');
        var result = func.createChar(name, refresh, currentfp);
		await interaction.editReply(result);
        
	},

};