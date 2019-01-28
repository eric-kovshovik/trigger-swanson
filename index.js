'use strict'
let AWS = require('aws-sdk');
var sns = new AWS.SNS();
var request = require('request');

exports.handler = function(event, context) {
    request({
      url: 'http://ron-swanson-quotes.herokuapp.com/v2/quotes',
      method: 'GET',
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var obj = JSON.parse(body);
        var quote = obj[0]
        var sms_params = {
            Message: quote,
            Subject: "Test SNS From Lambda",
            TopicArn: process.env.TOPIC_ARN
        };
        sns.publish(sms_params, context.done);
        };
      }
    )
};

