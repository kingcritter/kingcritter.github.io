var sort_i = 1;
var sort_j = 1;

function insertionSort(A) {
    for (var i = 1; i < A.length; i++) {
        var j = i;
        while (j > 0 && A[j-1].value > A[j].value) {
            var temp = A[j];
            A[j] = A[j-1];
            A[j-1] = temp;
            j--; 
        }
    }
}