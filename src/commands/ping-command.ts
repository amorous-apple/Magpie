import { Guild, User, TextChannel } from "discord.js";

import { Command } from "./command";

export class PingCommand extends Command {
    constructor() {
        super("ping");
    }

    run(args: string[], channel: TextChannel, author: User, guild?: Guild | undefined): void {
        channel.send("caw");
    }

    description(): string {
        return "Just a good ol' test ping"
    }

    usages(): string[] {
        return new Array<string>(
            "ping"
        );
    }
}