function redisCache(redisClient, type, cacheTime = 300) {
  return function(target, name, descriptor) {
    const fn = descriptor.value;

    descriptor.value = async(...args) => {
      const redisKey = `${name}:${args.join(':')}`;
      let value = JSON.parse(await redisClient.get(redisKey));
      if (!value) {
        value = await fn.apply(target, args);
        await redisClient.setex(redisKey, cacheTime, JSON.stringify(value));
      }
      return value;
    };

    return descriptor;
  };
}

export default redisCache;
