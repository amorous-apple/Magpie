import { CommandoClient } from "discord.js-commando";
import { readdir } from "fs";
import { join } from "path";
const { prefix, owner }: { prefix: string, owner: string } = require("../settings.json");

export class Bot {
    private client: CommandoClient;

    public async run(token: string) {
        console.log("Starting Magpie...");

        this.client = new CommandoClient({
            owner: owner,
            commandPrefix: prefix
        });

        readdir(join(__dirname, "./events/"), "utf8", (err: NodeJS.ErrnoException, files: string[]) => { 
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                let eventName: string = file.split(".")[0];
                const event: any = require(`./events/${file}`);
                this.client.on(eventName, event.bind(null, this.client));
                delete require.cache[require.resolve(`./events/${file}`)];
            });
        });

        this.client.registry
            .registerGroups([
                ["basic", "Basic"],
                ["moderation", "Moderation"]
            ])
            .registerDefaults()
            .registerCommandsIn(join(__dirname, "Commands"));

        this.client.login(token);
    }
}