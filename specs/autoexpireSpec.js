class Foo {
  counter = 1;

  constructor() {
    console.log(this.counter); // Prints '42'
  }

  getCounter() {
    return Foo.counter++;
  }
}
export default Foo;
