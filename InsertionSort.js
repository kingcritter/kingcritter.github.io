// so this is a step-by-step insertion sort, because "sleep"
// doesn't exist. Every time this function is called, 
// the list gets one step close to being sorted.
var sort_i=1;
var sort_j=1;

function insertionSort(A, id) {
    if (sort_i >= A.length) {
        window.clearTimeout(id);
        sort_i = 1;
        sort_j = 1;
    }
    else {

        if (sort_j > 0 && A[sort_j-1].value > A[sort_j].value) {
            var temp = A[sort_j];
            A[sort_j] = A[sort_j-1];
            A[sort_j-1] = temp;
            sort_j--;
        }
        if (sort_j <= 0 || A[sort_j-1].value <= A[sort_j].value) {
            sort_i++;
            sort_j=sort_i;
        }
    }

}