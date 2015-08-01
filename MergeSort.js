// thanks wikipedia

function merge_sort(list) {
	// base case
	if (list.length <= 1) {
		return list;
	}

	// split list down the middle 
	var left = list.slice(0, list.length/2);
	var right = list.slice(list.length/2, list.length);

	// recursivly sort sublists
	left = merge_sort(left);
	right = merge_sort(right);

	return merge(left, right);
}

function merge(left, right) {
	var result = [];
	while (left.length > 0 && right.length > 0) {
		var l = left.shift();
		var r = right.shift();
		if (l <= r) {
			result.push(l);
			right.unshift(r);
		}
		else {
			result.push(r);
			left.unshift(l);
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
