require('dotenv').config();
const { count } = require('console');
const fs = require('fs');

hashCode = function (s) {
    var h = 0, l = s.length, i = 0;
    if (l > 0)
        while (i < l)
            h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
};

exports.getValue = (from, to) => {
    distance = [
        [0, 3, 5, 6, 3, 4, 4, 3, 3, 8],
        [4, 0, 4, 2, 7, 1, 4, 3, 2, 7],
        [2, 4, 0, 2, 4, 3, 5, 4, 4, 4],
        [7, 1, 4, 0, 6, 4, 3, 2, 5, 3],
        [4, 3, 4, 4, 0, 4, 3, 5, 1, 3],
        [6, 4, 2, 4, 8, 0, 6, 3, 4, 3],
        [4, 3, 5, 1, 4, 5, 0, 8, 1, 6],
        [6, 4, 5, 1, 4, 5, 0, 8, 1, 6],
        [3, 4, 3, 4, 4, 5, 2, 3, 0, 4],
        [3, 4, 2, 2, 2, 5, 6, 3, 4, 0]
    ];
    from = hashCode(from) % 10;
    to = hashCode(to) % 10;
    return distance[from][to];
};