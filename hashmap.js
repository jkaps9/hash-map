export class HashMap {
  constructor(load_factor) {
    this.load_factor = load_factor;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    //takes two arguments: the first is a key, and the second is a value that is assigned to this key.
    // If a key already exists, then the old value is overwritten, and we can say that we update the key’s value
    // (e.g. Carlos is our key but it is called twice: once with value I am the old value., and once with value I am the new value..
    // Following this logic, Carlos should contain only the latter value)
    let hashCode = this.hash(key);
    this.checkIndex(hashCode); // will throw error if index is out of bounds
    this.buckets[hashCode] = this.buckets[hashCode] || [];
    this.buckets[hashCode].push([key, value]);
  }

  get(key) {
    //takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null
    let hashCode = this.hash(key);
    this.checkIndex(hashCode); // will throw error if index is out of bounds
    let arr = this.buckets[hashCode];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === key) {
        return arr[i][1];
      }
    }

    return null;
  }

  has(key) {
    //takes a key as an argument and returns true or false based on whether or not the key is in the hash map
    return this.get(key) !== null;
  }

  remove(key) {
    //takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false
  }

  length() {
    //returns the number of stored keys in the hash map
  }

  clear() {
    //removes all entries in the hash map.
  }

  keys() {
    //returns an array containing all the keys inside the hash map.
  }

  values() {
    //returns an array containing all the values.
  }

  entries() {
    //returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
  }
}
