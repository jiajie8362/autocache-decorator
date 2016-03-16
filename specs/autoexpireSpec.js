import autoexpire from '../src/autoexpire'; // eslint-disable-line
import autocache from '../src/autocache'; // eslint-disable-line

describe('autoexpire test', () => {
  requireDB();

  describe('expire the key', () => {
    const Foo = class {
      static data = 1;

      @autoexpire(redis, ':getCachedCounter:', true)
      updateCounter(value) {
        Foo.data = value;
        return 0;
      }

      @autocache(redis)
      getCachedCounter() {
        return Foo.data;
      }
    };

    it.only('should expire the key', async () => {
      const foo = new Foo();

      let r = await foo.getCachedCounter(1);
      expect(r).to.equal(1);

      // should expire the key
      await foo.updateCounter(3);

      // return the raw value
      r = await foo.getCachedCounter();

      expect(r).to.not.equal(1);
    });
  });
});
