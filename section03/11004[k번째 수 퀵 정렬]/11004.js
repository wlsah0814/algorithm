/*
  문제)
  수 N개 A1, A2, ..., AN이 주어진다. A를 오름차순 정렬했을 때, 앞에서부터 K번째 있는 수를 구하는 프로그램을 작성하시오.

  입력)
  첫째 줄에 N(1 ≤ N ≤ 5,000,000)과 K (1 ≤ K ≤ N)이 주어진다.
  둘째에는 A1, A2, ..., AN이 주어진다. (-109 ≤ Ai ≤ 109)

  출력)
  A를 정렬했을 때, 앞에서부터 K번째 있는 수를 출력한다.
*/

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

const [[N, K], arr] = input.map((v) => v.split(" ").map((v) => +v));
const quickSort = (arr, left, right) => {
    if (left >= right) {
        return;
    }

    // 기준점
    const mid = Math.floor((left + right) / 2);
    const pivot = arr[mid];
    const partition = divide(arr, left, right, pivot);

    quickSort(arr, left, partition - 1);
    quickSort(arr, partition, right);

    return arr;
}
const divide = (arr, left, right, pivot) => {
    while (left <= right) {
        // pivot과 비교
        while (arr[left] < pivot) {
            left++;
        }
        while (arr[right] > pivot) {
            right--;
        }

        // 왼쪽 값과 오른쪽 값을 바꾸기
        if (left <= right) {
            let tmp = arr[left];
            arr[left] = arr[right];
            arr[right] = tmp;
            left++;
            right--;
        }
    }
    return left;
}

const result = quickSort(arr, 0, arr.length -1)[K-1];

console.log(result);