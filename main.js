import { HashMap } from "./hashmap.js";

const test = new HashMap(0.75);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("initial length: " + test.length());

test.set("lion", "golden brown");
test.set("apple", "bright red");
test.set("jacket", "navy blue");
test.set("ice cream", "vanilla");

console.log("after overwriting keys: " + test.length());

console.log(test.buckets);

test.set("moon", "silver");

console.log("length after exceeding load factor: " + test.length());
console.log("capacity after exceeding load factor: " + test.capacity);
console.log(test.buckets);
