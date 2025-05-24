/*
  문제)
  루트가 있는 트리(rooted tree)가 주어지고, 그 트리 상의 두 정점이 주어질 때 그들의 가장 가까운 공통 조상(Nearest Common Ancestor)은 다음과 같이 정의됩니다.
  두 노드의 가장 가까운 공통 조상은, 두 노드를 모두 자손으로 가지면서 깊이가 가장 깊은(즉 두 노드에 가장 가까운) 노드를 말합니다.
  예를 들어 15와 11를 모두 자손으로 갖는 노드는 4와 8이 있지만, 그 중 깊이가 가장 깊은(15와 11에 가장 가까운) 노드는 4 이므로 가장 가까운 공통 조상은 4가 됩니다.
  루트가 있는 트리가 주어지고, 두 노드가 주어질 때 그 두 노드의 가장 가까운 공통 조상을 찾는 프로그램을 작성하세요

  입력)
  첫 줄에 테스트 케이스의 개수 T가 주어집니다.
  각 테스트 케이스마다, 첫째 줄에 트리를 구성하는 노드의 수 N이 주어집니다. (2 ≤ N ≤ 10,000)
  그리고 그 다음 N-1개의 줄에 트리를 구성하는 간선 정보가 주어집니다.
  한 간선 당 한 줄에 두 개의 숫자 A B 가 순서대로 주어지는데, 이는 A가 B의 부모라는 뜻입니다. (당연히 정점이 N개인 트리는 항상 N-1개의 간선으로 이루어집니다!)
  A와 B는 1 이상 N 이하의 정수로 이름 붙여집니다.
  테스트 케이스의 마지막 줄에 가장 가까운 공통 조상을 구할 두 노드가 주어집니다.

  출력)
  각 테스트 케이스 별로, 첫 줄에 입력에서 주어진 두 노드의 가장 가까운 공통 조상을 출력합니다.
*/

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n")

let idx = 0;
let T = parseInt(input[idx++]);

for (let test = 0; test < T; test++) {

    let N = parseInt(input[idx++]);
    let parent = Array(N + 1).fill(0);

    for (let i = 0; i < N - 1; i++) {
        let [a, b] = input[idx++].split(" ").map(Number);
        parent[b] = a;
    }

    let root = 0;
    for (let i = 1; i <= N; i++) {
        if (parent[i] === 0) {
            root = i;
            break;
        }
    }

    let depth = Array(N + 1).fill(0);

    function calculateDepth(node, d) {
        depth[node] = d;
        for (let i = 1; i <= N; i++) {
            if (parent[i] === node) {
                calculateDepth(i, d + 1);
            }
        }
    }

    calculateDepth(root, 0);

    let [node1, node2] = input[idx++].split(" ").map(Number);
    while (depth[node1] > depth[node2]) {
        node1 = parent[node1];
    }
    while (depth[node2] > depth[node1]) {
        node2 = parent[node2];
    }
    while (node1 !== node2) {
        node1 = parent[node1];
        node2 = parent[node2];
    }

    console.log(node1);
}