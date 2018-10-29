import { Guild, User, TextChannel, Channel, DMChannel } from "discord.js";

import { Command } from "./command";

export class PingCommand extends Command {
    constructor() {
        super("ping");
    }

    run(args: string[], channel: Channel, author: User, guild?: Guild | undefined): void {
        switch (channel.type) {
            case "text": {
                let c = channel as TextChannel
                c.send("caw");
            } break;

            case "dm": {
                let c = channel as DMChannel;
                c.send("caw")
            } break
        }
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