/**
 * @copyright 2015, jie jia <jiajie8362@gmail.com>
 * [The decorator should be used on methods]
 * @param  {redisClient} redis [redis client]
 * @param  {string} key   [redis key to expire]
 * @param  {boolean} checkResult   [whether to check the function execute result is true]
 * @param  {boolean} useResult   [whether to use result as key]
 */
function autoexpire(redis, prefixKey, checkResult = false) {
  return (target, name, descriptor) => {
    const fn = descriptor.value;

    descriptor.value = async (...args) => {
      const r = await fn.apply(this, args);
      const key = prefixKey;

      if (!checkResult) {
        console.log(`'delete kety' ${checkResult} ${r}`);
        await redis.del(key);
      }
    };

    return descriptor;
  };
}

export default autoexpire;
