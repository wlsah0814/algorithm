/*
  문제)
  어떤 N개의 수가 주어져 있다. 그런데 중간에 수의 변경이 빈번히 일어나고 그 중간에 어떤 부분의 합을 구하려 한다. 만약에 1,2,3,4,5 라는 수가 있고,
  3번째 수를 6으로 바꾸고 2번째부터 5번째까지 합을 구하라고 한다면 17을 출력하면 되는 것이다.
  그리고 그 상태에서 다섯 번째 수를 2로 바꾸고 3번째부터 5번째까지 합을 구하라고 한다면 12가 될 것이다.

  입력)
  첫째 줄에 수의 개수 N(1 ≤ N ≤ 1,000,000)과 M(1 ≤ M ≤ 10,000), K(1 ≤ K ≤ 10,000) 가 주어진다. M은 수의 변경이 일어나는 횟수이고,
  K는 구간의 합을 구하는 횟수이다. 그리고 둘째 줄부터 N+1번째 줄까지 N개의 수가 주어진다. 그리고 N+2번째 줄부터 N+M+K+1번째 줄까지 세 개의 정수 a, b, c가 주어지는데,
  a가 1인 경우 b(1 ≤ b ≤ N)번째 수를 c로 바꾸고 a가 2인 경우에는 b(1 ≤ b ≤ N)번째 수부터 c(b ≤ c ≤ N)번째 수까지의 합을 구하여 출력하면 된다.
  입력으로 주어지는 모든 수는 -263보다 크거나 같고, 263-1보다 작거나 같은 정수이다.

  출력)
  첫째 줄부터 K줄에 걸쳐 구한 구간의 합을 출력한다. 단, 정답은 -263보다 크거나 같고, 263-1보다 작거나 같은 정수이다.
*/

class SegmentTree {
    /** arr 원본 배열, start: 시작인덱스, end:배열끝인덱스, node:트리루트 */
    constructor(arr, start = 0, end = arr.length-1, node = 1) {
        const width = 2 ** Math.ceil(Math.log2(arr.length));
        this.tree = new BigInt64Array(2 * width);
        this.arr = arr;
        this.start = start;
        this.end = end;
        this.node = node;
        this.val = null;
    }

    /** 배열로 누적 합 트리 생성 start: 시작인덱스, end: 끝인덱스, node:노드시작인덱스 */
    initTree(start = this.start, end = this.end, node = this.node) {
        if (start == end) {
            this.tree[node] = this.arr[start];
            return this.tree[node];
        }

        let mid = parseInt((start + end) / 2);
        this.tree[node] += this.initTree(start, mid, 2*node);
        this.tree[node] += this.initTree(mid+1, end, 2*node+1);
        return this.tree[node];
    }

    /** 인덱스 left에서 right까지 합을 반환한다. */
    getSum(left, right, start = this.start, end = this.end, node = this.node) {
        if (start > right || end < left) return 0n;
        if (start >= left && end <= right) return this.tree[node];

        let mid = parseInt((start + end) / 2);
        return (
            this.getSum(left, right, start, mid, 2*node) +
            this.getSum(left, right, mid+1, end, 2*node+1)
        );
    }

    /** arr[index]의 값을 val으로 수정하고 구간 합을 갱신한다. */
    update(index, val, start = this.start, end = this.end, node = this.node) {
        if (index < start || index > end) return;

        let diff = val - this.arr[index];
        this.tree[node] += diff;
        if (start == end) return;

        let mid = parseInt((start + end) / 2);
        this.update(index, val, start, mid, 2*node);
        this.update(index, val, mid+1, end, 2*node+1);
        if (node == 1) this.arr[index] = val;
    }
}

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n")
const [N, M, K] = input[0].split(" ").map(Number);
const arr = new Array(N+1).fill(0n);
for (let i = 1; i < N+1; i++) {
    console.log()
    arr[i] = BigInt(input[i]);
}

const tree = new SegmentTree(arr, 1, N, 1);
tree.initTree();

let answer = "";
for (let i = N+1; i < N+1+M+K; i++) {
    let [a, b, c] = input[i].split(" ");
    if (Number(a) == 1) tree.update(Number(b), BigInt(c));
    else answer += `${tree.getSum(Number(b), Number(c))}\n`;
}

console.log(answer);
