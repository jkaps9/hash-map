export class HashMap {
  constructor(load_factor) {
    this.load_factor = load_factor;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  checkIndex(index, max) {
    if (index < 0 || index >= max) {
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

    if (this.has(key)) {
      let hashCode = this.hash(key);
      //find the entry with the key and overwrite the value
      for (let i = 0; i < this.buckets[hashCode].length; i++) {
        if (this.buckets[hashCode][i][0] === key) {
          this.buckets[hashCode][i][1] = value;
        }
      }
    } else {
      if (this.length() + 1 > this.load_factor * this.capacity) {
        this.grow();
      }
      let hashCode = this.hash(key);
      this.checkIndex(hashCode, this.capacity); // will throw error if index is out of bounds
      this.buckets[hashCode] = this.buckets[hashCode] || [];
      this.buckets[hashCode].push([key, value]);
    }
  }

  get(key) {
    //takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null
    let hashCode = this.hash(key);
    this.checkIndex(hashCode); // will throw error if index is out of bounds
    let arr = this.buckets[hashCode];
    if (arr !== undefined) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === key) {
          return arr[i][1];
        }
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
    if (this.has(key)) {
      let hashCode = this.hash(key);
      this.checkIndex(hashCode); // will throw error if index is out of bounds
      let arr = this.buckets[hashCode];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === key) {
          this.buckets[hashCode].splice(i, 1);
        }
      }
      return true;
    } else {
      return false;
    }
  }

  length() {
    //returns the number of stored keys in the hash map
    let keyCount = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        keyCount += this.buckets[i].length;
      }
    }
    return keyCount;
  }

  clear() {
    //removes all entries in the hash map.
    this.buckets = new Array(this.capacity);
  }

  keys() {
    //returns an array containing all the keys inside the hash map.
    let allKeys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          allKeys.push(this.buckets[i][j][0]);
        }
      }
    }
    return allKeys;
  }

  values() {
    //returns an array containing all the values.
    let allValues = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          allValues.push(this.buckets[i][j][1]);
        }
      }
    }
    return allValues;
  }

  entries() {
    //returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
    let allEntries = [];
    let allKeys = this.keys();

    for (let i = 0; i < allKeys.length; i++) {
      allEntries.push([allKeys[i], this.get(allKeys[i])]);
    }
    return allEntries;
  }

  grow() {
    // Create a new array that is double the size of the existing one
    // Copy all existing nodes to the new Array hashing their keys again
    let newBuckets = new Array(this.capacity * 2);
    let allEntries = this.entries();
    this.capacity *= 2;
    for (let i = 0; i < allEntries.length; i++) {
      let hashCode = this.hash(allEntries[i][0]);
      this.checkIndex(hashCode, this.capacity * 2);
      newBuckets[hashCode] = newBuckets[hashCode] || [];
      newBuckets[hashCode].push([allEntries[i][0], allEntries[i][1]]);
    }
    this.buckets = newBuckets;
  }
}
