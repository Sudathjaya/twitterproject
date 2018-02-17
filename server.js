var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var functions = require('./functions');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.post('/authorize', functions.authorize);
app.post('/search', functions.search);
app.post('/user', functions.user);



var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'twitter'
});
connection.connect(function (error) {
    if (!!error) {
        console.log('Error',error);
    }
    else{
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

app.post('/addDeatils1',function(req,res,next){
    //console.log(req);
    var post=req.body;
   // console.log(req);
   
    console.log(post.LastName,post.FirstName);
    connection.query("INSERT INTO `user` (`LastName`, `FirstName`) VALUES ('"+post.LastName+"', '"+post.FirstName+"');",function (error)
    {
        if (error){
         console.log("error");
        }
        else{
            console.log('success insert');
            res.json("ok");
        }
    
    });
});
 app.post('/saveDeatils',function(req,res,next){
    //console.log(req);
    var post=req.body;
    console.log(post);
   
    connection.query("INSERT INTO `twitter` (`user_id`, `created_at`) VALUES ('"+post.user_id+"', '"+post.created_at+"');",function (error)
    {
        if (error){
         console.log("error");
        }
        else{
            console.log('success insert');
            res.json("ok");
        }
    
    });
 });

app.get('/getDetails',function(req,res){

    connection.query("select * from user ",function (error,rows)
    {
        if (error){
         console.log("error get");
        }
        else{
            console.log('success get');
            res.json(rows);
        }
    
    });
});


app.listen(3000,function(){
    console.log('connected')
});