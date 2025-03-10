let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

console.log(input);

let casesCount = Number(input[0]);
let cases = input[1].split("");
let sum = 0;

for (let i = 0; i < casesCount; i++) {
  sum = sum + Number(cases[i]);
}

console.log(sum);
