/**
 * @copyright 2015, jie jia <jiajie8362@gmail.com>
 * [The decorator should be used on methods]
 * @param  {redisClient} redis [redis client]
 * @param  {[type]}  type        [object, array, simple]
 * @param  {[int]}  cacheTime =  300 [redis key expire time]
 */
function autocache(redis, type, cacheTime = 300) {
  return (target, name, descriptor) => {
    const fn = descriptor.value;

    descriptor.value = async (...args) => {
      const redisKey = `${name}:${args.join(':')}`;
      let value = JSON.parse(await redis.get(redisKey));
      if (!value) {
        value = await fn.apply(target, args);
        await redis.setex(redisKey, cacheTime, JSON.stringify(value));
      }
      return value;
    };

    return descriptor;
  };
}

export default autocache;
