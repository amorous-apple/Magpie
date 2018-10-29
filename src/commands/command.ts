import { User, Guild, TextChannel } from "discord.js";

export abstract class Command {
    public readonly name: string

    constructor(name: string) {
        this.name = name;
    }

    abstract run(args: string[], channel: TextChannel, author: User, guild?: Guild): void

    abstract description(): string;

    abstract usages(): string[];
}