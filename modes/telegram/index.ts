import { Telegraf } from "telegraf";
import chalk from "chalk";
import { WELCOME } from "./constants.ts";
import { registerHandlers } from "./handlers.ts";

export async function runTelegramMode() {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const ownerId = process.env.TELEGRAM_OWNER_ID?.trim();

  if (!token) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN in .env");
  }

  if (!ownerId) {
    throw new Error("Missing TELEGRAM_OWNER_ID in .env");
  }

  const bot = new Telegraf(token);

  registerHandlers(bot);

  await bot.telegram.sendMessage(ownerId, WELCOME, {
    parse_mode: "Markdown",
  });

  console.log(chalk.green("Sent welcome message to Telegram.\n"));

  await bot.launch();

  console.log(chalk.green("Telegram bot is running. Press Ctrl+C to stop.\n"));

  await new Promise<void>((resolve) => {
    const stop = () => {
      bot.stop("SIGINT");
      resolve();
    };

    process.once("SIGINT", stop);
    process.once("SIGTERM", stop);
  });
}