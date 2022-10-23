const { SlashCommandBuilder } = require('discord.js');
const func = require("../helperFunc")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('refresh')
		.setDescription('Refresh your fate points after a scene.')
        .addStringOption(option =>
			option
				.setName('charname')
				.setDescription('Character Name')
                .setRequired(true))
        ,
	async execute(interaction) {
        await interaction.deferReply();
        const name = interaction.options.getString('charname');
        var success = func.refreshChar(name);
        if (success) {
            await interaction.editReply("Fate pints refreshed!");
        } else {
            await interaction.editReply("Something went wrong...");
        };
		
        
	},

};