import { Message } from "discord.js";
import { Command, CommandoClient, CommandMessage } from "discord.js-commando";

export default class Birb extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "birb",
            group: "basic",
            memberName: "birb",
            description: "???",
            guildOnly: false
        });
    }

    public async run(message: CommandMessage, args: { n: string }): Promise<Message | Message[]> {
        return message.say("Birb.");
    }
}