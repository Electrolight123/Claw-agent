# Claw Agent

Claw Agent is a local AI workspace assistant built with Bun, TypeScript, OpenRouter, and Telegram. It helps developers ask questions about a codebase, generate implementation plans, and execute code changes through an approval-based agent workflow.

The project is inspired by modern AI coding-agent workflows such as OpenClaw, Claude Code, and Cursor-style agents, but is implemented as a custom local developer tool.

---

## Features

### CLI Interface

Run the agent directly from the terminal using an interactive CLI menu.

Available modes:

- **Ask Mode** — ask questions about the current codebase
- **Plan Mode** — generate a step-by-step implementation plan
- **Agent Mode** — let the AI inspect files, propose changes, and execute approved tasks
- **Telegram Mode** — control the agent remotely through a Telegram bot

---

### Ask Mode

Ask Mode is a codebase question-answering mode.

It can:

- Read project files
- List files and folders
- Search files by name or content
- Analyze the codebase structure
- Answer questions about the current workspace
- Optionally save answers as Markdown files

Example use cases:

```text
Explain what this project does.
Find the main entry point of the app.
Summarize the Agent Mode architecture.
What files are responsible for Telegram integration?
```

---

### Plan Mode

Plan Mode takes a user goal and converts it into a structured execution plan.

It can:

- Inspect the existing codebase
- Generate implementation steps
- Add complexity labels such as low, medium, or high
- Let the user select which steps should be executed
- Execute selected steps through the agent workflow
- Ask for approval before applying file changes

Example:

```text
Add a logging system to this project.
Create a README for this codebase.
Add validation to the Telegram bot commands.
```

---

### Agent Mode

Agent Mode is the main autonomous workflow.

It can:

- Read files
- Create files
- Modify files
- Delete files
- Create folders
- Search files
- Analyze the codebase
- Queue shell commands
- Show staged changes before applying them

The AI does not directly modify files. File and shell changes are staged first, then reviewed and approved before being applied.

---

### Diff Review

Before applying file updates, the project can show a before-and-after diff.

Example:

```diff
- old code
+ new code
```

This helps the user understand exactly what the agent wants to change.

---

### Telegram Bot Integration

The project also supports Telegram control.

Available Telegram commands:

```text
/start
/ask <question>
/plan <goal>
/agent <task>
```

Telegram Mode supports:

- Asking codebase questions
- Generating plans
- Selecting plan steps with inline buttons
- Running agent tasks
- Reviewing staged changes
- Showing diffs
- Accepting or rejecting changes from Telegram

Only the configured Telegram owner can use the bot.

---

### Web Tools

If a Firecrawl API key is configured, the agent can use web tools:

- Web search
- Web page crawling
- URL fetching

These tools are useful when the agent needs external documentation or online context.

---

## Tech Stack

- **Bun** — JavaScript/TypeScript runtime and package manager
- **TypeScript** — typed application logic
- **Commander** — CLI command structure
- **Clack Prompts** — interactive terminal prompts
- **Chalk** — terminal styling
- **Figlet** — terminal banner rendering
- **Vercel AI SDK** — AI tool-calling and agent workflow
- **OpenRouter** — LLM provider integration
- **Zod** — tool input validation
- **Diff** — file diff generation
- **Marked + marked-terminal** — Markdown rendering in terminal
- **Firecrawl** — optional web search and crawling
- **Telegraf** — Telegram bot integration

---

## Development Reference

This project was bootstrapped with Bun.

```bash
bun init
```

The main project dependencies were added using Bun:

```bash
bun add commander @clack/core @clack/prompts figlet chalk
bun add marked marked-terminal diff
bun add ai @openrouter/ai-sdk-provider @mendable/firecrawl-js telegraf
bun add --save-dev @types/bun @types/node @types/marked-terminal
```

For normal usage after cloning the repository, users only need to install dependencies with:

```bash
bun install
```

---

## Prerequisites

Before running the project, make sure you have:

- Bun installed
- Node.js and npm installed
- An OpenRouter API key
- A Firecrawl API key, optional for web tools
- A Telegram bot token, optional for Telegram Mode

---

## Project Structure

```text
claw-agent/
│
├── ai/
│   ├── ai.config.ts
│   └── index.ts
│
├── bin/
│   └── claw-agent.js
│
├── modes/
│   ├── cli.ts
│   │
│   ├── agent/
│   │   ├── action-tracker.ts
│   │   ├── agent-tools.ts
│   │   ├── approval.ts
│   │   ├── diff-view.ts
│   │   ├── orchestrator.ts
│   │   ├── tool-executor.ts
│   │   └── types.ts
│   │
│   ├── ask/
│   │   └── orchestrator.ts
│   │
│   ├── plan/
│   │   ├── orchestrator.ts
│   │   ├── planner.ts
│   │   ├── selection.ts
│   │   ├── types.ts
│   │   └── web-tools.ts
│   │
│   └── telegram/
│       ├── agent-run.ts
│       ├── approval-session.ts
│       ├── auth.ts
│       ├── constants.ts
│       ├── handlers.ts
│       ├── index.ts
│       ├── plan-session.ts
│       └── text.ts
│
├── tui/
│   ├── terminal-md.ts
│   └── wakeup.ts
│
├── index.ts
├── package.json
├── tsconfig.json
├── bun.lock
├── .gitignore
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone "https://github.com/Electrolight123/Claw-agent.git"
cd Claw-agent
```

Install dependencies:

```bash
bun install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_DEFAULT_MODEL=your_openrouter_model_here

FIRECRAWL_API_KEY=your_firecrawl_api_key_here

TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_OWNER_ID=your_telegram_owner_id_here
```

### Required Variables

| Variable | Required | Purpose |
|---|---:|---|
| `OPENROUTER_API_KEY` | Yes | Used to call the AI model |
| `OPENROUTER_DEFAULT_MODEL` | Yes | Default model used by the agent |
| `FIRECRAWL_API_KEY` | No | Enables web search and web crawling tools |
| `TELEGRAM_BOT_TOKEN` | Only for Telegram Mode | Token from BotFather |
| `TELEGRAM_OWNER_ID` | Only for Telegram Mode | Restricts bot access to one owner |

---

## Running the Project

Run the app directly with Bun:

```bash
bun ./index.ts wakeup
```

This opens the main menu:

```text
CLI
Telegram
Exit
```

---

## Global CLI Usage

The project includes a global launcher.

Link the package locally:

```bash
npm link
```

Then run:

```bash
claw-agent wakeup
```

To unlink:

```bash
npm unlink -g claw-agent
```

---

## CLI Workflow

```text
claw-agent wakeup
        ↓
Choose CLI
        ↓
Choose Agent / Plan / Ask
        ↓
Run selected mode
```

---

## Telegram Workflow

Start the project:

```bash
claw-agent wakeup
```

Choose:

```text
Telegram
```

Then use the bot from Telegram:

```text
/start
/ask explain this project
/plan add a logging system
/agent create a README file
```

Telegram approval flow:

```text
AI stages changes
        ↓
Bot shows approval buttons
        ↓
User taps Show Diff / Accept All / Reject All
        ↓
Only accepted changes are applied
```

---

## Example Use Cases

### Ask Mode

Use Ask Mode to understand files, project structure, or external web content.

```text
What does modes/agent/tool-executor.ts do?
```

```text
What is inside my index.ts file?
```

```text
Explain what is going on inside modes/agent/orchestrator.ts with proper examples.
```

```text
Scrape this URL and summarize the page content:
https://en.wikipedia.org/wiki/Bitcoin
```

---

### Plan Mode

Use Plan Mode to convert a goal into clear implementation steps.

```text
Create a step-by-step plan to add logging to this project.
```

```text
Plan me a web search tool integration into the current project using Firecrawl.
```

```text
Plan me a to-do list app using HTML, CSS, and JavaScript.
```

Telegram example:

```text
/plan Plan me a to-do list app using HTML CSS JS
```

---

### Agent Mode

Use Agent Mode when you want the AI to create, edit, or organize files in the workspace.

```text
Create a CONTRIBUTING.md file for this repository.
```

```text
Can you please modify my README file with hello from CLI
```

```text
Create me a simple hello world folder
```

```text
Create me a simple yellow landing page in HTML and CSS into the current working directory with its own folder.
```

---

### Telegram Mode

Use Telegram Mode to run agent workflows from Telegram.

```text
/agent create a basic README summary for this project
```

```text
/ask What is inside my index.ts file?
```

```text
/agent Edit my README with hello from Telegram
```

---

## Roadmap

Planned improvements:

- Add persistent audit logs
- Add test cases for tools and approval flow
- Add better Markdown escaping for Telegram responses
- Add support for more messaging platforms
- Add Docker setup
- Add memory/session persistence
- Add model selection from CLI
- Add safer shell command policies
- Add structured evaluation for agent output quality

---

## Disclaimer

This project is a personal learning and portfolio project. It is inspired by modern AI coding-agent workflows, but it is not affiliated with OpenClaw, Cursor, Claude Code, OpenRouter, Firecrawl, or Telegram.

Use Agent Mode carefully because it can stage file changes and shell commands. Always review diffs before approving changes.
