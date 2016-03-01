/**
* decorators.js
* (c) 2016 jia jie
* MIT Licensed
* https://github.com/jiajie8362/decorator-utils
* @license
*/

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

export { default as redisCache } from './cache';
