var vo = require('vo');

var AmazonService = require('./services/amazon');
var SlackService = require('./services/slack');

var amazonInit = {
    url: 'http://www.amazon.com/Amazing-Meal-Chocolate-36-3-Ounce/dp/B0083F5GVW/ref=pd_sim_sbs_325_1?ie=UTF8&refRID=0HMSY3HVXR00PDAGWJEX&dpID=51sc9Xsj2uL&dpSrc=sims&preST=_AC_UL160_SR97%2C160_'
};

vo(AmazonService.init, AmazonService.getPrice)(amazonInit, SlackService.sendToChannel);


