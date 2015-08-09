// bubble your way to sucess 
function bubbleSort(A) {
	var history = [];
	for (i = A.length; i > 0; i--) {
		for (j = 0; j < i-1; j++) {
			if (A[j] > A[j+1]) {
				var temp = A[j];
				A[j] = A[j+1];
				A[j+1] = temp;
			}
			var hState = new HistoryState(A.slice(), [i, j], []);
			history.push(hState);
		}
	}
	return history;
}