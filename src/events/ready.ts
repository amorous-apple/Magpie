import { CommandoClient } from "discord.js-commando";

module.exports = async (client: CommandoClient) => {
    console.log("Moonlark has started.");
    client.user.setActivity("Bird.");
}