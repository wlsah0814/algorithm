/*
  문제)
  N×N개의 수가 N×N 크기의 표에 채워져 있다. (x1, y1)부터 (x2, y2)까지 합을 구하는 프로그램을 작성하시오. (x, y)는 x행 y열을 의미한다.
  예를 들어, N = 4이고, 표가 아래와 같이 채워져 있는 경우를 살펴보자.
  1	 2	3  4
  2	 3	4  5
  3	 4	5  6
  4	 5	6  7
  여기서 (2, 2)부터 (3, 4)까지 합을 구하면 3+4+5+4+5+6 = 27이고, (4, 4)부터 (4, 4)까지 합을 구하면 7이다.
  표에 채워져 있는 수와 합을 구하는 연산이 주어졌을 때, 이를 처리하는 프로그램을 작성하시오.

  입력)
  첫째 줄에 표의 크기 N과 합을 구해야 하는 횟수 M이 주어진다. (1 ≤ N ≤ 1024, 1 ≤ M ≤ 100,000) 둘째 줄부터 N개의 줄에는 표에 채워져 있는 수가 1행부터 차례대로 주어진다.
  다음 M개의 줄에는 네 개의 정수 x1, y1, x2, y2 가 주어지며, (x1, y1)부터 (x2, y2)의 합을 구해 출력해야 한다.
  표에 채워져 있는 수는 1,000보다 작거나 같은 자연수이다. (x1 ≤ x2, y1 ≤ y2)

  출력)
  총 M줄에 걸쳐 (x1, y1)부터 (x2, y2)까지 합을 구해 출력한다.
*/

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const inputBoard = input.slice(0, N).map(row => row.split(" ").map(Number));

/** 2차원 누적 합 배열 생성 */
const newBoard = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0))
for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
        newBoard[i][j] =
            newBoard[i - 1][j] +
            newBoard[i][j - 1] -
            newBoard[i - 1][j - 1] +
            inputBoard[i - 1][j - 1];
    }
}

const result = [];

/** M개 만큼 합 구하기 */
for (let i = N; i < N + M; i++) {
    const [x1, y1, x2, y2] = input[i].split(" ").map(Number);
    const tmp =
        newBoard[x2][y2] -
        newBoard[x1 - 1][y2] -
        newBoard[x2][y1 - 1] +
        newBoard[x1 - 1][y1 - 1];

    result.push(tmp);
}

console.log(result.join("\n"));


