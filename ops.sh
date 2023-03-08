ps -ef | grep 8080
export OPENAI_API_KEY=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
npm run build
nohup npm run start -- --port 8080 &
tail -f nohup.out

