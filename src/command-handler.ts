import { Message } from "discord.js";

import { Command } from "./commands/command";
import { PingCommand } from "./commands/ping-command";

export class CommandHandler {
    private commands: Map<string, Command> = new Map();

    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
        this.init();
    }

    // TODO: Add reflection to load commands from commands dir
    private init() {
        this.addCommand(new PingCommand());
    }

    private addCommand(command: Command) {
        this.commands.set(command.name, command);
    }

    private isCommand(msgContent: string): boolean {
        return msgContent.startsWith(this.prefix);
    }

    process(message: Message) {
        let messageRaw = message.content.toLowerCase().trim();

        let author = message.author;

        if (!this.isCommand(messageRaw) || author.bot) {
            return;
        }

        let content = messageRaw.substring(this.prefix.length).trim();
        let channel = message.channel;
        let guild = message.guild;

        if (content === "") {
            return;
        }

        let arr = content.split(" ", 2);
        let command = arr[0];
        let args = (arr[1]) ? arr[1].split(" ") : new Array<string>();

        if (this.commands.has(command)) {
            let cmd = this.commands.get(command);
            if (!cmd) {
                return; // tslint no like when I don't check if it exists
            }

            cmd.run(args, channel, author, guild);
        } else {
            message.channel.send(`Error: command \`${command}\` was not found`)
        }
    }
}