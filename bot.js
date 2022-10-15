require('dotenv').config(); //initialize dotenv
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function rollDice(modifier) {
    var total = 0;
    for (let index = 0; index < 4; index++) {
        var roll = round(random() * 2) - 1;
        total += roll
    };

    var result = total + modifier;
    return "Result: " + total + " + " + modifier + " = " + result + ".";
};

//make sure this line is the last line
client.login(process.env.DISCORD_TOKEN); //login bot using token