import './specHelpers/sinon';
import './specHelpers/chai';
import './specHelpers/requireDB';
import 'babel-polyfill';
global.redis = require('then-redis').createClient();
global.Promise = require('bluebird');
