const { plsParseArgs } = require('plsargs');
const { Worker } = require('worker_threads');

const args = plsParseArgs(process.argv.slice(2));

if (!args.has("playerName") || !args.has("host") || !args.has("port") || !args.has("count") || !args.has("version")) {
  console.error("Usage: node index.js --playerName <playerName> --host <host> --port <port> --count <count> --version <version>");
  process.exit(1);
}

const playerName = args.get("playerName");
const host = args.get("host");
const port = Number(args.get("port"));
const count = args.get("count");
const version = args.get("version");
const delay = parseInt(args.get("delay")) || 100;

console.log({
  playerName,
  host,
  port,
  count,
  version,
});

(async () => {

  for (let i = 0; i < count; i++) {
    const worker = new Worker("./worker.js", {
      workerData: {
        host,
        port,
        version,
        username: `${playerName}${i + 1}`,
      }
    });

    worker.on("exit", (code) => {
      console.log(`Worker stopped with exit code ${code}`);
    });

    await new Promise((resolve) => setTimeout(resolve, delay));
  }
})();
