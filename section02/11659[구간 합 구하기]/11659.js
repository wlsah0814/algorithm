/*
  문제)
  수 N개가 주어졌을 때, i번째 수부터 j번째 수까지 합을 구하는 프로그램을 작성하시오.

  입력)
  첫째 줄에 수의 개수 N과 합을 구해야 하는 횟수 M이 주어진다. 
  둘째 줄에는 N개의 수가 주어진다. 수는 1,000보다 작거나 같은 자연수이다. 
  셋째 줄부터 M개의 줄에는 합을 구해야 하는 구간 i와 j가 주어진다.

  출력)
  총 M개의 줄에 입력으로 주어진 i번째 수부터 j번째 수까지 합을 출력한다.
*/

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

let cases = input[1].split(" ").map(Number);
let sumArr = new Array(cases.length).fill(0);
let result = [];

// 합 배열
for (let i = 0; i < cases.length; i++) {
  sumArr[i + 1] = sumArr[i] + cases[i];
}

// 구간 합
input.slice(2).forEach((ij) => {
  const [i, j] = ij.split(" ");
  result.push(sumArr[j] - sumArr[i - 1]);
});

console.log(result);
