var Nightmare = require('nightmare');
var selector = '.a-size-large';

module.exports = {

    init: function (config) {
        console.log('initializing...');
        this.url = config.url;
        this.selector = selector;
    },

    getPrice: function *() {
        console.log('get price on amazon');
        var nightmare = Nightmare();
        var price = yield nightmare
            .goto(this.url)
            .wait(this.selector)
            .evaluate(function (sel) {
                return document.querySelector(sel).innerText;
            }, this.selector);

        yield nightmare.end();

        return price;
    }
};