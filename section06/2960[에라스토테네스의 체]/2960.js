/*
  문제)
  에라토스테네스의 체는 N보다 작거나 같은 모든 소수를 찾는 유명한 알고리즘이다.
  이 알고리즘은 다음과 같다.

  1. 2부터 N까지 모든 정수를 적는다.
  2. 아직 지우지 않은 수 중 가장 작은 수를 찾는다. 이것을 P라고 하고, 이 수는 소수이다.
  3. P를 지우고, 아직 지우지 않은 P의 배수를 크기 순서대로 지운다.
  4. 아직 모든 수를 지우지 않았다면, 다시 2번 단계로 간다.
  5. N, K가 주어졌을 때, K번째 지우는 수를 구하는 프로그램을 작성하시오.

  입력)
  첫째 줄에 N과 K가 주어진다. (1 ≤ K < N, max(1, K) < N ≤ 1000)

  출력)
  첫째 줄에 K번째 지워진 수를 출력한다.
*/

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

const [N, K] = input.shift().split(" ").map(Number)

let arr = []
for(let i = 2; i <= N; i++) {
    arr.push(i)
}

let count = 0
let prime
let nth

while(count < K) {
    prime = arr[0]
    arr.some(v => {
        if(v % prime === 0) {
            arr.splice(arr.indexOf(v), 1)
            nth = v
            count++
        }
        if(count === K) return true
    })
}

console.log(nth);







