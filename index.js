var Nightmare = require('nightmare');
var vo = require('vo');
var Slack = require('node-slack');
var schedule = require('node-schedule');

var SLACK_HOOK_URL = 'https://hooks.slack.com/services/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';
var toRunEveryHour = '0 * * * *';
var title = 'Amazing-Meal-Chocolate-36-3-Ounce';
var url = 'http://www.amazon.com/Amazing-Meal-Chocolate-36-3-Ounce/dp/B0083F5GVW/ref=pd_sim_sbs_325_1?ie=UTF8&refRID=0HMSY3HVXR00PDAGWJEX&dpID=51sc9Xsj2uL&dpSrc=sims&preST=_AC_UL160_SR97%2C160_';
var priceSelector = '.a-size-large';
// var slackBotConfigs =         slack.send({
//             text: title + ': ' + price,
//             channel: '#amazon',
//             username: 'Bot',
//             icon_emoji: 'taco'
//         });


var slack = new Slack(SLACK_HOOK_URL);


var AmazonService = {
    init: function (config) {
        this.url = config.url;
        this.selector = config.selector;
    },

    getPrice: function *() {

        var nightmare = Nightmare();

        var price = yield nightmare
            .goto(this.url)

            // get price
            .wait(this.selector)
            .evaluate(function (sel) {
                return document.querySelector(sel).innerText;
            }, this.selector);

        yield nightmare.end();

        return price;
    },

    handleResults: function (err, res) {
        if (err) {
            console.log(err);
        }

        console.log(res);
    }
}

var config = {
    url: 'http://www.amazon.com/Amazing-Meal-Chocolate-36-3-Ounce/dp/B0083F5GVW/ref=pd_sim_sbs_325_1?ie=UTF8&refRID=0HMSY3HVXR00PDAGWJEX&dpID=51sc9Xsj2uL&dpSrc=sims&preST=_AC_UL160_SR97%2C160_',
    selector: '.a-size-large'
};





vo(AmazonService.init, AmazonService.getPrice)(config, AmazonService.handleResults);


