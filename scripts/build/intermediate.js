
var test = (function () {

    console.log('test');

})();

var init = (function (test) {

    $(document).ready(function () {
        console.log('test');
    });

})();
