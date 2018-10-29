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

    process(message: Message) {
        let content = message.content;  
        let author = message.author;
        let channel = message.channel;
        let guild = message.guild;

        if (!content.startsWith(this.prefix) || author.bot) {
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
            message.channel.send("Error: command `${command}` was not found")
        }
    }
}