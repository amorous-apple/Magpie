import { Message, Guild, GuildMember } from "discord.js";
import { Command, CommandoClient, CommandMessage } from "discord.js-commando";

export default class Ban extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "ban",
            group: "moderation",
            memberName: "ban",
            description: "Bans member with reason provided.",
            guildOnly: true,
            args: [
                {
                    key: 'member',
                    prompt: "Who would you like to ban?",
                    type: "member",
                    default: ""
                },
                {
                    key: 'reason',
                    prompt: "What is your reason for banning this member?",
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    public hasPermission(message: CommandMessage): boolean {
        return this.client.isOwner(message.author) || !message.member.hasPermission("BAN_MEMBERS");
    }

    public async run(message: CommandMessage, args: { member: GuildMember, reason: string }): Promise<Message | Message[]> {
        const { member, reason } = args;
        if (member.hasPermission("BAN_MEMBERS")) return message.reply("You cannot ban this user.");
        await member.kick(reason);
        return message.say("User has been banned.");
    }
}