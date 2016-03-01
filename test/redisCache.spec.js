import redisCache from '../src/redisCache';

describe('redisCache', function() {
  requireDB();
  let Foo;

  beforeEach(function() {
    Foo = class {
      static counter = 1;
      @redisCache(redis)
      bar() {
        return Foo.counter++;
      }
    };
  });

  it('should get data from redis', async() => {
    const inst = new Foo();
    let r = await inst.bar();
    expect(r).to.equal(1);
    r = await inst.bar();
    expect(r).to.equal(1);
  });
});
