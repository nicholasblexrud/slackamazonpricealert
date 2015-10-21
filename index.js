var Nightmare = require('nightmare');
var vo = require('vo');
var Slack = require('node-slack');
var schedule = require('node-schedule');

var SLACK_HOOK_URL = 'https://hooks.slack.com/services/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';
var toRunEveryHour = '0 * * * *';
var title = 'Amazing-Meal-Chocolate-36-3-Ounce';

var slack = new Slack(SLACK_HOOK_URL);

schedule.scheduleJob(toRunEveryHour, function () {
    vo(run)(function (err) {
        if (err) {
            throw err;
        }
    });
});

function *run() {
    var nightmare = Nightmare();
    var priceSelector = '.a-size-large';

    var price = yield nightmare
        .goto('http://www.amazon.com/' + title + '/dp/B0083F5GVW/ref=pd_sim_sbs_325_1?ie=UTF8&refRID=0HMSY3HVXR00PDAGWJEX&dpID=51sc9Xsj2uL&dpSrc=sims&preST=_AC_UL160_SR97%2C160_')

        // get price
        .wait(priceSelector)
        .evaluate(function (sel) {
            return document.querySelector(sel).innerText;
        }, priceSelector)

        slack.send({
            text: title + ': ' + price,
            channel: '#amazon',
            username: 'Bot',
            icon_emoji: 'taco'
        });

  yield nightmare.end();
}