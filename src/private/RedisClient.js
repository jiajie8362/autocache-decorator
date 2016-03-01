import { Client as ThenRedisClient } from 'then-redis';

class RedisClient extends ThenRedisClient {
  constructor(server, database = null) {
    super(server);

    if (database) {
      this.select(database);
    }
  }
}

export default RedisClient;
