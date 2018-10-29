import { CommandoClient } from "discord.js-commando";
const { name }: { name:string } = require("../../settings.json");

module.exports = async (client: CommandoClient) => {
    console.log(`${name} has started.`);
    client.user.setActivity("Bird.");
}