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

You can use it as a wraper for your terminal, to which, when you get an error, it will try to ask the AI to help you.

```
~> # ask a shell command using natural language
~> #! ask something to the AI itself
```

## TODO

- [] fix bugs with sub-tasks that take over the shell
- [] improve AI submittion ~~(custom model)~~
