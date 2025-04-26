/*
  문제)
  자연수 n이 주어졌을 때, GCD(n, k) = 1을 만족하는 자연수 1 ≤ k ≤ n 의 개수를 구하는 프로그램을 작성하시오.

  입력)
  첫째 줄에 자연수 n (1 ≤ n ≤ 10의 12승)이 주어진다.

  출력)
  GCD(n, k) = 1을 만족하는 자연수 1 ≤ k ≤ n 의 개수를 출력한다.

*/

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

const N = BigInt(input.shift().toString());

const eulerPhi = (n) => {
    let result = n;
    for (let i = 2n; i * i <= n; i++) {
        if (n % i === 0n) {
            result = result - result / i;
            while (n % i === 0n) {
                n /= i;
            }
        }
    }

    if (n > 1n) {
        result = result - result / n;
    }

    return result;
}

console.log(eulerPhi(N).toString());