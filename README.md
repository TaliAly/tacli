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

## TODO

- [] fix bugs with sub-tasks that take over the shell
- [] improve AI submittion ~~(custom model)~~
