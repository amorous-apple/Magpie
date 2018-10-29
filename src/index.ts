import { Client } from "discord.js";
import { addListeners } from "./events/events";

//Import statements

const { token }: { token: string } = require("../settings.json");

const client = new Client();

addListeners(client);

client.login(token);