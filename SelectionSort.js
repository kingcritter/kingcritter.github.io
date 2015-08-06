function selectionSort(A) {
    var history = []
    // console.log(A.length);
    for (var j = 0; j < A.length - 1; j++) {
        var iMin = j;
        // console.log(j + " " + iMin);
        for (var i = j+1; i < A.length; i++) {
            if (A[i] < A[iMin]) {
                iMin = i;
            }
        }

        if (iMin != j) {
            var temp = A[j];
            A[j] = A[iMin];
            A[iMin] = temp;
        }
        history.push(A.slice());
    }

    return history;
} 