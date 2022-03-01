const redis = require("redis");

const redisClient = redis.createClient(process.env.REDIS_PORT);

module.exports = {
  get: (key, value) => {
    redisClient.set(key, JSON.stringify(value));
  },
  set: (req, res, next) => {
    let key = req.originalUrl;

    redisClient.get(key, (error, data) => {
      if (error) {
        res.status(400).send({
          ok: false,
          message: error,
        });
      }
      if (data !== null) {
        res.status(200).send({
          ok: true,
          data: JSON.parse(data),
        });
      } else next();
    });
  },
};
