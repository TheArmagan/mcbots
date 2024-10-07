const mineflayer = require('mineflayer');
const Thread = require('worker_threads');

if (Thread.workerData) {
  const { host, username, version, port } = Thread.workerData;
  function start() {
    console.log("Starting bot", username);
    try {
      const bot = mineflayer.createBot({
        host,
        port,
        username,
        auth: 'offline',
        version
      });

      bot.once("spawn", () => {
        console.log("Spawned!", username);
      });

      bot.once("kicked", (reason) => {
        console.log(`Kicked: ${reason}`);
        start();
      });
    } catch (e) {
      console.error(e);
      start();
    }
  }

  start();
}