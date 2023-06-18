import axios from 'axios';
import { config } from 'dotenv';
import Discord from "discord.js";
config();

const apiUrl = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.OPENAI_API_KEY;

// number of messages that app is allowed to retrieve from the chat history
const MESSAGE_HISTORY_LIMIT = 10

/**
 * Forward the message to GPT3.5 turbo, then send the response in the given channel
 * @param {*} client discord client object
 * @param {*} message discord message object
 */

// send request to GPT3.5 turbo
export async function forwardToGpt(client: Discord.Client, message: Discord.Message) {
    // stop: '\n'
    const requestBody = {
        model: 'gpt-3.5-turbo-0613',
        messages: [
            {role: "system", content: "You are a helpful assistant who responds succinctly"},
            {role: "user", content: message.content}
        ],
        temperature: 0.5,
        max_tokens: 500,
        n: 1,
    };

    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    };

    axios.post(apiUrl, requestBody, requestOptions)
        .then(response => {
            const data = response.data;
            const content = data.choices[0].message.content;
            message.reply(content);
        })
        .catch(error => {
            console.log("Request messages:", message)
            console.error("Error caught:", error.message);
            console.error("Error type:", error.type);
            console.error("Error param:", error.param);
            console.error("Error code:", error.code);
            // console.error("Error full data:", error);
            message.reply(`${error.message}`);
            message.reply(`${error.type}`);
        });
}