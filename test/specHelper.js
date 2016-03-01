require('babel/register')({
  extensions: ['.js'],
  stage: 0
});
var chai =require('chai');
var sinonChai = require('sinon-chai');
var RedisClient = require('../src/private/RedisClient');

function cleanRedis() {
  return redis.flushdb();
}

chai.should();
chai.use(sinonChai);
global.chai = chai.should;
global.expect = chai.expect;
global.redis = new RedisClient();
global.__ = require('lodash');
global.Promise = require('bluebird');
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
