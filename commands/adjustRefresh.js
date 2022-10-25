const { SlashCommandBuilder } = require('discord.js');
const func = require("../helperFunc")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('adjustrefresh')
		.setDescription('Change your refresh value.')
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
        ,
	async execute(interaction) {
        await interaction.deferReply();
        const name = interaction.options.getString('charname');
        const refresh = interaction.options.getNumber('refresh');
        var success = func.adjustRefresh(name, refresh);
        if (success) {
            await interaction.editReply("You spent a fate point! Fate points remaining: " + func.viewFatePoints(name));
        } else {
            await interaction.editReply("Something went wrong...");
        };
		
        
	},

};