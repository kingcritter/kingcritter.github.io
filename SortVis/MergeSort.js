// thanks wikipedia

function merge_sort(list) {
	var history = [];
	return actual_merge_sort(list, [0, list.length], history);
}

function actual_merge_sort(list, indices, history) {
	// base case
	if (list.slice(indices[0], indices[1]) <= 1) {
		return indices;
	}

	// split list down the middle 
	var left = [indices[0], indices[1]/2];
	var right = [indices[1]/2, indices[1]];  
	// recursivly sort sublists
	left = actual_merge_sort(list, left, history);
	right = actual_merge_sort(list, right, history);

	return merge(list, left, right, history);
}

function merge(list, left, right, history) {
	var result = [];
	leftCount = left[0];
	rightCount = right[0];
	while (leftCount < left[1] && rightCount < right[1]) {
		var l = list[leftCount];
		var r = right[rightCount];
		if (l <= r) {
			result.push(l);
			leftCount++;
		}
		else {
			result.push(r);
			rightCount++;
		}

		var uglyMess = list.slice(0, leftCount);
		var changedPart = list.slice(leftCount, right[1]);
		var lastBit = list.slice(right[1], list.length);
		uglyMess.concat(changedPart);
		uglyMess.concat(lastBit);

		var lookingAt = [leftCount, rightCount];
		var state = new HistoryState(uglyMess, lookingAt);

		history.push(state);
	}
	// deal with leftover elements
	while (left.length > 0) {
		result.push(left.shift());
	}
	while (right.length > 0) {
		result.push(right.shift());
	}
	return result;
}
