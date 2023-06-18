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
    console.log(`Received message ${message.content}`)
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user!!.tag}`)
})

const token = process.env.TOKEN

client.login(token)