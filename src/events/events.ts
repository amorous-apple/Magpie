import { Client, Message } from "discord.js";

//imports

export function addListeners(client: Client) {
    client.on("ready", () => {
        console.log("thats a lot of damage");
    });

    client.on("message", (message: Message) => {
        if (message.content.includes("magpie ping")) {
            message.channel.send("caw");
        }

        if (message.content.includes("magpie hello")) {
            message.channel.send("ur mum gae, lmao");
        }
    });
}