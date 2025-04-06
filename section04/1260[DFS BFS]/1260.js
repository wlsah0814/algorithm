/*
  문제)
  그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오.
  단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고,
  더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

  입력)
  첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다.
  다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다.
  어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.

  출력)
  첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.
*/

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

const [N, M, V] = input.shift().split(" ").map(Number);
const line = input.map((v) => v.split(" ").map(Number));

/** DFS, BFS 저장 배열 & BFS 큐 배열 */
const ansDfs = [];
const ansBfs = [];
const queue = [];

/** 인접 리스트 배열 & 방문 정점 저장 배열 */
const graph = Array.from({ length: N + 1 }, () => []);
let visited = Array.from({ length: N + 1 }, () => 0);


/** 그래프 생성 */
for (let [from, to] of line) {
    graph[from].push(to);
    graph[to].push(from);
}

/** 그래프 오름차순 정렬 */
for (let i = 1; i < graph.length; i++) {
    graph[i].sort((a, b) => a - b);
}

/** DFS 함수 */
const dfs = (cnt) => {
    if (ansDfs.length === N) return;
    ansDfs.push(cnt);
    visited[cnt] = 1;
    for (let next of graph[cnt]) {
        if (!visited[next]) {
            visited[next] = 1;
            dfs(next);
        }
    }
}

dfs(V);

/** 방문 정점 배열 초기화 */
visited = visited.map(() => 0);

/** BFS 함수 */
const bfs = () => {
    queue.push(V);
    visited[V] = 1;
    while (queue.length !== 0) {
        const now = queue.shift();
        ansBfs.push(now);
        for (let next of graph[now]) {
            if (!visited[next]) {
                queue.push(next);
                visited[next] = 1;
            }
        }
    }
}

bfs();

console.log(ansDfs.join(" "));
console.log(ansBfs.join(" "));