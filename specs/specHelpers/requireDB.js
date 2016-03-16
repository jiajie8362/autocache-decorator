function cleanRedis() {
  return redis.flushdb();
}

global.requireDB = () => {
  beforeEach(done => {
    return Promise.all([cleanRedis()])
    .nodeify(done);
  });

  afterEach(done => {
    return Promise.all([cleanRedis()])
    .nodeify(done);
  });
};
