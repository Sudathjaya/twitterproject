var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var functions = require('./functions');
var Twitter = require('twitter-js-client').Twitter;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.post('/authorize', functions.authorize);
app.post('/search', functions.search);
app.post('/followers', functions.followers);
app.post('/timeline', functions.timeline);

var mysql = require('mysql');
//Callback functions 
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    //console.log('Data [%s]', data);
};



//Get this data from your twitter apps dashboard 
var config = {
    "consumerKey": "2JLqJFxYsw91LItNBobDeCPxg",
    "consumerSecret": "DyOaUhNH4cKzjCBHBDdvsH0xQ6WvINJA42MnUyVT569laueqdj",
    "accessToken": "3150913916-iQ22hFLMtoT7V6FWLkRBt4MnZPAEQdOZWjNw6tu",
    "accessTokenSecret": "kdKftCItbyJiVVS2SjYsPtdisvqjbUsXrwKXBP7iFTkWC",
    "callBackUrl": "XXX"
}

var twitter = new Twitter(config);




var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'project001'
});
connection.connect(function (error) {
    if (!!error) {
        console.log('Error', error);
    }
    else {
        console.log('Connected Database');
    }
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/addDeatils1', function (req, res, next) {
    //console.log(req);
    var post = req.body;
    // console.log(req);

    console.log(post.LastName, post.FirstName);
    connection.query("INSERT INTO `user` (`LastName`, `FirstName`) VALUES ('" + post.LastName + "', '" + post.FirstName + "');", function (error) {
        if (error) {
            console.log("error");
        }
        else {
            console.log('success insert');
            res.json("ok");
        }

    });
});
app.post('/saveincomeText', function (req, res, next) {
    //console.log(req);
    var post = req.body;
    console.log(post);

    connection.query("INSERT INTO `twitter` (`name`, `url`, `imageurl`, `postimage`, `replytourl`, `created_at`) VALUES ('" + post.name + "', '" + post.url + "', '" + post.imageurl + "', '" + post.postimage + "', '" + post.replytourl + "', '" + post.created_at + "');", function (error) {
        if (error) {
            console.log("few records  exist");
        }
        else {
            console.log('success insert');
            res.json("ok");
        }

    });
});

app.get('/getPreviousTwittes', function (req, res) {

    connection.query("select * from twitter order by id desc limit 100 offset 10", function (error, rows) {
        if (error) {
            console.log("error get");
        }
        else {
            console.log('success get');
            res.json(rows);
        }

    });
});
app.get('/getTimeline', function (req, res) {

    twitter.getMentionsTimeline({ count: '10' }, error, function (data) {
        res.send(data);
    });
});
app.get('/getHomeTimeline', function (req, res) {

    twitter.getHomeTimeline({ count: '20' }, error, function (data) {
        // console.log(data);
        res.send(data);
    })
});
app.post('/saveHomeTimeline', function (req, res, next) {
    //console.log(req);
    var post = req.body;
    console.log(post);

    connection.query("INSERT INTO `home_timeline` (`ht_post_id`, `ht_post_created_at`, `ht_url`, `ht_user_screen_name`, `ht_user_profile_image_url`, `ht_media_url`, `ht_user_screen_name_display`, `ht_extended_entities_url`) VALUES ('" + post.ht_post_id + "', '" + post.ht_post_created_at + "', '" + post.ht_url + "', '" + post.ht_user_screen_name + "', '" + post.ht_user_profile_image_url + "', '" + post.ht_media_url + "', '" + post.ht_user_screen_name_display + "', '" + post.ht_extended_entities_url + "');", function (error) {
        if (error) {
            console.log("few records  exist");
        }
        else {
            console.log('success insert');
            res.json("ok");
        }

    });
});
app.get('/getHomePreDetails', function (req, res) {

    connection.query("select * from home_timeline  order by id desc limit 100 offset 20", function (error, rows) {
        if (error) {
            console.log("error get");
        }
        else {
            console.log('success get');
            res.json(rows);
        }

    });
});
app.listen(3000, function () {
    console.log('connected')
});