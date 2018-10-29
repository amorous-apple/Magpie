import { Bot } from "./bot";
const { token }: { token: string } = require("../settings.json");

const bot: Bot = new Bot();
bot.run(token);