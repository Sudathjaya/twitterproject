var request = require('request');
var config = require('./config');

functions = {
    authorize: function (req, res) {
        var header = config.consumerkey + ':' + config.consumersecret;
        var encheader = new Buffer(header).toString('base64');
        var finalheader = 'Basic ' + encheader;

        request.post('https://api.twitter.com/oauth2/token', {
            form: { 'grant_type': 'client_credentials' },
            headers: { Authorization: finalheader }
        }, function (error, response, body) {
            if (error)
                console.log(error);
            else {
                config.bearertoken = JSON.parse(body).access_token;

                res.json({ success: true, data: config.bearertoken });
            }

        })
    },

    search: function (req, res) {
        var searchquery = req.body.query;
        var encsearchquery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + config.bearertoken;
        request.get('https://api.twitter.com/1.1/search/tweets.json?q=' + encsearchquery +
            '&result_type=recent', { headers: { Authorization: bearerheader } }, function (error, body, response) {
                if (error)
                    console.log(error);
                else {

                    res.json({ success: true, data: JSON.parse(body.body) });
                }
            })
    },


    followers: function (req, res) {
        var searchquery = req.body.screenname;
        var encsearchquery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + config.bearertoken;
        request.get('https://api.twitter.com/1.1/followers/list.json?cursor=-1&screen_name=BrentonAGM&skip_status=true&include_user_entities=false=' + encsearchquery + '&count=199', { headers: { Authorization: bearerheader } }, function (error, body, response) {
            if (error)
                console.log(error);
            else {
                res.json({ success: true, data: JSON.parse(body.body) });
            }
        })
    },
    timeline: function (req, res) {
        var searchquery = req.body.screenname;
        var encsearchquery = encodeURIComponent(searchquery);
        var bearerheader = 'Bearer ' + config.bearertoken;
        request.get('https://api.twitter.com/1.1/friends/list.json?cursor=-1&screen_name=BrentonAGM&skip_status=true&include_user_entities=false' + encsearchquery + '&count=199', { headers: { Authorization: bearerheader } }, function (error, body, response) {
            if (error)
                console.log(error);
            else {
                res.json({ success: true, data: JSON.parse(body.body) });
            }
        })
    }

}

module.exports = functions;

