const redis = require("redis");
const REDIS_PORT = process.env.REDIS_URL || 6379;

const client = redis.createClient(REDIS_PORT, {no_ready_check: true});

client.on("error", function(error) {
  console.error(error);
});

module.exports = client;
