const { SlashCommandBuilder } = require('discord.js');
const func = require("../helperFunc")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spend')
		.setDescription('Spend a fate point.')
        .addStringOption(option =>
			option
				.setName('charname')
				.setDescription('Character Name')
                .setRequired(true))
        ,
	async execute(interaction) {
        await interaction.deferReply();
        const name = interaction.options.getString('charname');
        const fatePoints = func.viewFatePoints(name);
        var success = func.adjustFatePoint(fatePoints - 1);
        if (success) {
            await interaction.editReply("You spent a fate point! Fate points remaining: " + func.viewFatePoints(name));
        } else {
            await interaction.editReply("Something went wrong...");
        };
		
        
	},

};