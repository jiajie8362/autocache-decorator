/**
 * @copyright 2015, jie jia <jiajie8362@gmail.com>
 * [The decorator should be used on methods]
 * @param  {redisClient} redis [redis client]
 * @param  {[type]} key   [redis key to expire]
 */
function autoexpire(redis, key) {
  return async(target, name, descriptor) => {
    await redis.expire(key);
  };
}

export default autoexpire;
