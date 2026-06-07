#!/usr/bin/env bun

import { Command } from "commander";
import { runWakeup } from "./tui/wakeup.ts";

const program = new Command();

program
  .name("claw-agent")
  .description(
    "Local AI workspace agent with CLI, planning, file tools, and human-in-the-loop approval"
  )
  .version("0.0.1");

program
  .command("wakeup")
  .description("Launch the interactive agent menu")
  .action(async () => {
    await runWakeup();
  });

await program.parseAsync(process.argv);