
(function(root, factory) {

    if (typeof jQuery === 'function') {
        factory(root, jQuery);
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            factory(root, $);
        });
    }

}) (this, function(root, $) {
