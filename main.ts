import "https://deno.land/x/dotenv/load.ts";
import { Client, Intents, Message } from "https://deno.land/x/harmony/mod.ts";

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dices = [2, 4, 6, 8, 10, 12, 20, 100];

const bot = new Client();

bot.on("ready", () => console.log(`Ready! User: ${bot.user?.tag}`));

bot.on("messageCreate", (message: Message) => {
  if (message.author.bot || message.content[0] !== '#') return;

  const numbers = message.content.match(/\d+/g);
  if (!numbers?.length) return;

  const res = numbers
    .filter(n => dices.includes(+n))
    .map(n => `**${random(1, +n)}**_(d${n})_`)
    .join('   ');

  if (!res.length) return;

  message.channel.send(`<@${message.author.id}> ${res}`);
});

bot.connect(Deno.env.get("BOT_TOKEN"), Intents.None);