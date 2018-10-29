import { CommandoClient } from "discord.js-commando";

module.exports = async (client: CommandoClient) => {
    console.log("Magpie has started.");
    client.user.setActivity("Bird.");
}