/*
  문제)
  정렬되어있는 두 배열 A와 B가 주어진다. 두 배열을 합친 다음 정렬해서 출력하는 프로그램을 작성하시오.

  입력)
  첫째 줄에 배열 A의 크기 N, 배열 B의 크기 M이 주어진다. (1 ≤ N, M ≤ 1,000,000)
  둘째 줄에는 배열 A의 내용이, 셋째 줄에는 배열 B의 내용이 주어진다. 배열에 들어있는 수는 절댓값이 109보다 작거나 같은 정수이다.

  출력)
  첫째 줄에 두 배열을 합친 후 정렬한 결과를 출력한다.
*/

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

const arr1 = input[1].split(' ').map(Number)
const arr2 = input[2].split(' ').map(Number)
let result = [];
let start = 0, end = 0;

while (start < arr1.length && end < arr2.length) {
  if (arr1[start] < arr2[end]) {
      result.push(arr1[start]);
      start++;
  } else {
      result.push(arr2[end]);
      end++;
  }
}

while (start < arr1.length) {
  result.push(arr1[start]);
  start++;
}

while (end < arr2.length) {
  result.push(arr2[end]);
  end++;
}

console.log(result.join(" "));