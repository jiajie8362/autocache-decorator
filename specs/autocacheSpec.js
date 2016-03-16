import autocache from '../src/autocache'; // eslint-disable-line

describe('autocache test', () => {
  requireDB();

  describe('simple data', () => {
    const Foo = class {
      static data = 1;

      updateCounter(value) {
        Foo.data = value;
      }

      @autocache(redis)
      getCachedCounter() {
        return Foo.data;
      }

      getNonCachedCounter() {
        return Foo.data;
      }
    };

    it('should cache the key', async () => {
      const foo = new Foo();

      let r = await foo.getCachedCounter();
      expect(r).to.equal(1);

      // update source value
      foo.updateCounter(3);

      // still get cached value
      r = await foo.getCachedCounter();
      expect(r).to.equal(1);

      r = await foo.getNonCachedCounter();
      expect(r).to.equal(3);
    });
  });

  describe('array', () => {
    const Foo = class {
      static data = [1, 2, 3];

      updateCounter(value) {
        Foo.data = value;
      }

      @autocache(redis)
      getCachedCounter() {
        return Foo.data;
      }

      getNonCachedCounter() {
        return Foo.data;
      }
    };

    it('should cache the key', async () => {
      const foo = new Foo();

      let r = await foo.getCachedCounter();
      expect(r).to.deep.equal([1, 2, 3]);

      // update source value
      foo.updateCounter([4, 5, 6]);

      // still get cached value
      r = await foo.getCachedCounter();
      expect(r).to.deep.equal([1, 2, 3]);

      r = await foo.getNonCachedCounter();
      expect(r).to.deep.equal([4, 5, 6]);
    });
  });

  describe('object', () => {
    const Foo = class {
      static data = {
        name: '1',
        age: 12
      };

      updateCounter(value) {
        Foo.data = value;
      }

      @autocache(redis)
      getCachedCounter() {
        return Foo.data;
      }

      getNonCachedCounter() {
        return Foo.data;
      }
    };

    it('should cache the key', async () => {
      const foo = new Foo();

      let r = await foo.getCachedCounter();
      expect(r).to.deep.equal({ name: '1', age: 12 });

      // update source value
      foo.updateCounter({ name: '2', age: 24 });

      // still get cached value
      r = await foo.getCachedCounter();
      expect(r).to.deep.equal({ name: '1', age: 12 });

      r = await foo.getNonCachedCounter();
      expect(r).to.deep.equal({ name: '2', age: 24 });
    });
  });
});
