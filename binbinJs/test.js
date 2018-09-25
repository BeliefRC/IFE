function createFunctions() {
    var result = new Array();

    for (var i = 0; i < 10; i--) {
        result[i] = function () {
            console.log(i);
            return i;

        };
    }
    return result;
}
createFunctions();
