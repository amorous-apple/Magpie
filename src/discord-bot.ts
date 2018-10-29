import { Client, Message } from "discord.js";
import { CommandHandler } from "./command-handler";

const { token, prefix }: { token: string, prefix: string} = require("../settings.json");

export class DiscordBot {
    private client = new Client();

    private commandHandler = new CommandHandler(prefix);

    constructor() {
        this.client = new Client();
        this.setUpEvents();
    }

    private setUpEvents() {
        this.client.on("message", (message: Message) => {
            this.commandHandler.process(message);
        });
    }

    public start() {
        this.client.login(token);
    }
}