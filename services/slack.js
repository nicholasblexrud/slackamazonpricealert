var Slack = require('node-slack');
var config = require('../libs/configs/libs.configs.slack');
var _ = require('underscore');

var slack = new Slack(config.HOOK_URL);

module.exports = {
    sendToChannel: function (error, price) {
        var options = _.extend({text: price}, config.CHANNEL_SETTINGS);

        if (error) {
            console.log(error);
        }

        console.log('sending price to slack channel')
        slack.send(options);
    }
};