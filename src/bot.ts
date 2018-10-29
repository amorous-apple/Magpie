import { CommandoClient } from "discord.js-commando";
import { readdir } from "fs";
import { join } from "path";
const { prefix, owner }: { prefix: string, owner: string } = require("../settings.json");

export class Bot {
    private client: CommandoClient;

    public async run(token: string) {
        console.log("Starting Moonlark...");

        this.client = new CommandoClient({
            owner: owner,
            commandPrefix: prefix
        });

        readdir(join(__dirname, "./events/"), "utf8", (err: NodeJS.ErrnoException, files: string[]) => { 
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                this.client.on(file.split(".")[0], require(`./events/${file}`).bind(null, this.client));
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
