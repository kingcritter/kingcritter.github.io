// a simple linked list
var LinkedList = function() {
    this.first = null;
    this.length = 0;
    var node = function(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }

    this.add = function(data) {
        var n = new node(data);
        if (this.length == 0) {
            this.first = n;
        }
        else {
            this.first.prev = n;
            n.next = this.first;
            this.first = n;
        }
        this.length += 1;
    }

    // takes a node that's in the list, 
    // removes it from the list
    this.remove = function(n) {
        // if not at the end
        if (n.next != null) {
            n.next.prev = n.prev;
        }
        // if not at the beginning
        if (n.prev != null) {
            n.prev.next = n.next;
            this.first = n.next;
        } 
        // must be first
        else { 
            this.first = n.next;
            // delinks the old first
            if (n.next != null) {
                n.next.prev = null;
            }
        }

        this.length -= 1;
    }

}