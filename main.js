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
console.log(test.get("frog")); // green
console.log(test.get("grape")); // purple
console.log(test.get("melon")); // null

console.log(test.has("frog")); // true
console.log(test.has("grape")); // true
console.log(test.has("melon")); // false
