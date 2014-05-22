
(function(root, factory) {

    if (typeof jQuery === 'function') {
        factory(root, jQuery);
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            factory(root, $);
        });
    }

}) (this, function(root, $) {

var test = (function () {

    console.log('test');

})();

var init = (function (test) {

    $(document).ready(function () {
        console.log('test');
    });

})();

});