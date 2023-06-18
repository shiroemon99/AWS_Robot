import Discord from 'discord.js';
import {config} from 'dotenv';
config()

const client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.DirectMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.DirectMessages
    ],
    partials: [
        Discord.Partials.Channel, // Required to receive DMs
    ]
})

client.on('messageCreate', (message: Discord.Message) => {

    //console.log(`Received message ${message.content}`)

    // If the message is sent by current bot or another bot
    if (message.author == client.user || message.author.bot) {
        console.log(`Received message from bot or self`);
        return;
    }

    //  If the message mentions the bot
    if (message.mentions.has(client.user!!)) {
        message.reply(`Hola`);
    }
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user!!.tag}`)
})

const discordToken = process.env.DISCORD_TOKEN

client.login(discordToken)