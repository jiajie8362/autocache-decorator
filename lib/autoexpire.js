"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

/**
 * @copyright 2015, jie jia <jiajie8362@gmail.com>
 * [The decorator should be used on methods]
 * @param  {redisClient} redis [redis client]
 * @param  {string} key   [redis key to expire]
 * @param  {boolean} checkResult   [whether to check the function execute result is true]
 * @param  {boolean} useResult   [whether to use result as key]
 */
function autoexpire(redis, prefixKey) {
  var _this = this;

  var checkResult = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  return function (target, name, descriptor) {
    var fn = descriptor.value;

    descriptor.value = function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var r, key;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fn.apply(_this, args);

              case 2:
                r = _context.sent;
                key = prefixKey;

                if (checkResult) {
                  _context.next = 8;
                  break;
                }

                console.log("'delete kety' " + checkResult + " " + r);
                _context.next = 8;
                return redis.del(key);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x2) {
        return ref.apply(this, arguments);
      };
    }();

    return descriptor;
  };
}

exports.default = autoexpire;