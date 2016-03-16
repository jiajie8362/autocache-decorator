'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

/**
 * @copyright 2015, jie jia <jiajie8362@gmail.com>
 * [The decorator should be used on methods]
 * @param  {redisClient} redis [redis client]
 * @param  {string}  prefix  [the redis key prefix]
 * @param  {int}  cacheTime =  300 [redis key expire time]
 */
function autocache(redis) {
  var _this = this;

  var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  var cacheTime = arguments.length <= 2 || arguments[2] === undefined ? 300 : arguments[2];

  return function (target, name, descriptor) {
    var fn = descriptor.value;

    descriptor.value = function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var redisKey, value;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                redisKey = prefix + ':' + name + ':' + args.join(':');
                _context.t0 = JSON;
                _context.next = 4;
                return redis.get(redisKey);

              case 4:
                _context.t1 = _context.sent;
                value = _context.t0.parse.call(_context.t0, _context.t1);

                if (value) {
                  _context.next = 12;
                  break;
                }

                _context.next = 9;
                return fn.apply(target, args);

              case 9:
                value = _context.sent;
                _context.next = 12;
                return redis.setex(redisKey, cacheTime, JSON.stringify(value));

              case 12:
                return _context.abrupt('return', value);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x3) {
        return ref.apply(this, arguments);
      };
    }();

    return descriptor;
  };
}

exports.default = autocache;