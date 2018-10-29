import { Message, Guild, GuildMember } from "discord.js";
import { Command, CommandoClient, CommandMessage } from "discord.js-commando";

export default class Kick extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "kick",
            group: "moderation",
            memberName: "kick",
            description: "Kicks member with reason provided.",
            guildOnly: true,
            args: [
                {
                    key: 'member',
                    prompt: "Who would you like to kick?",
                    type: "member",
                    default: ""
                },
                {
                    key: 'reason',
                    prompt: "What is your reason for kicking this member?",
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    public hasPermission(message: CommandMessage): boolean {
        return this.client.isOwner(message.author) || message.member.hasPermission("KICK_MEMBERS");
    }

    public async run(message: CommandMessage, args: { member: GuildMember, reason: string }): Promise<Message | Message[]> {
        const { member, reason } = args;
        if (member.hasPermission("KICK_MEMBERS")) return message.reply("You cannot kick this user.");
        await member.kick(reason);
        return message.say("User has been kicked.");
    }
}