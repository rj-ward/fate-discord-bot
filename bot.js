require('dotenv').config(); //initialize dotenv
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//make sure this line is the last line
client.login(process.env.DISCORD_TOKEN); //login bot using token