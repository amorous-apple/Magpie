import { Command } from "./command";

export class PingCommand extends Command {
    constructor() {
        super("ping");
    }

    run(args: string[], channel: import("discord.js").Channel, author: import("discord.js").User, guild?: import("discord.js").Guild | undefined): void {
        throw new Error("Method not implemented.");
    }

    description(): string {
        throw new Error("Method not implemented.");
    }

    usages(): string[] {
        throw new Error("Method not implemented.");
    }
}