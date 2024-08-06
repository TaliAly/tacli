# Tacli - Midu Hackton 2024

## How to install?

```bash
git clone https://github.com/TaliAly/tacli.git
# ssh version: git clone git@github.com:TaliAly/tacli.git
bun i
bun run build # or bun start
./tacli config -r keys <openai_key>
# OR you can use ollama
./tacli config -r service ollama
./tacli config -r model <your_ollama_model>
```

## Uses?

You can use it as a wraper for your terminal, to which, when you get an error, it will try to ask the AI to help you code

```
Usage: tacli [OPTIONS] [PROMPT]

DESCRIPTION
tacli is a wrapper for your everyday use of commands inside the terminal. It lets you work without having to google each command that you want to run or just to search for something inside your terminal

The following options are available:
    config

VERSION v1.0.1


```
