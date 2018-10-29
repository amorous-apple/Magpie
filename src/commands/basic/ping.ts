import { Message } from "discord.js";
import { Command, CommandoClient, CommandMessage } from "discord.js-commando";

export default class Ping extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "bird",
            group: "basic",
            memberName: "bird",
            description: "???",
            guildOnly: false
        });
    }

    public async run(message: CommandMessage, args: { n: string }): Promise<Message | Message[]> {
        return message.say("Bird.");
    }
}