# Tacli - Midu Hackton 2024

## Folder Structure:

- dist - development builds && outputs of typescript
- src/ - rest of the app
- src/sdk - vercel sdk AI handler

## How to run?

```bash
git clone https://github.com/TaliAly/tacli.git
# ssh version: git clone git@github.com:TaliAly/tacli.git
bun i
bun dev
```

## Uses?

Worp has two uses.
The main one is using as a shell for your projects instead of your current terminal. Using it for running complex commands or as a spellchecker for the terminal

The other is to use it as a terminal gpt similar to [this project](https://github.com/aandrew-me/tgpt) but made with typescript

## Usage

```
Usage: worp [OPTIONS] [PROMPT]

DESCRIPTION
worp is a wrapper for your everyday use of commands inside the terminal. It lets you work without having to google each command that you want to run or just to search for something inside your terminal

The following options are available:
-a or --ask=PROMPT
    Use the GPT capabilities of the AI to ask about anything
-c or --config=./relative/path.json
    Pass a custom config for the terminal when working with different AI and projects
-s or --shell=PROMPT
    Ask the AI a shell command in natural language and get back the output withing your clipboard

VERSION v1.0.1


```
