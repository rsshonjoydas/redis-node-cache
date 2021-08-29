const express = require("express")
const redis = require("redis")
const util = require("util")

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || "redis://127.0.0.1:6379";
const client = redis.createClient(REDIS_PORT);

client.set = util.promisify(client.set)
client.get = util.promisify(client.get);

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { key, value } = req.body;
  const response = await client.set(key, value)
  res.json(response)
})

app.get("/", async (req, res) => {
  const { key } = req.body;
  const value = await client.get(key)
  res.json(value)
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})