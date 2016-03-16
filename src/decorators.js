/**
* decorators.js
* (c) 2016 jia jie
* MIT Licensed
* https://github.com/jiajie8362/autocache-decorator
* @license
*/

import chai from 'chai';
import sinonChai from 'sinon-chai';
import RedisClient from '../src/private/RedisClient';

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
