import { CommandoClient } from "discord.js-commando";
import { readdir } from "fs";
import { join } from "path";
const { prefix }: { prefix: string } = require("../settings.json");

export class Bot {
    private client: CommandoClient;

    public async run(token: string) {
        console.log("Starting Magpie...");

        this.client = new CommandoClient({
            owner: "461242998433382421",
            commandPrefix: prefix,
        });

        readdir(join(__dirname, "./events/"), "utf8", (err, files) => { 
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                console.log(file);
                let eventName = file.split(".")[0];
                const event = require(`./events/${file}`);
                this.client.on(eventName, event.bind(null, this.client));
                delete require.cache[require.resolve(`./events/${file}`)];
            });
        });

        this.client.registry
            .registerGroups([
                ["basic", "Basic"],
            ])
            .registerDefaults()
            .registerCommandsIn(join(__dirname, "Commands"));

        this.client.login(token);
    }
}