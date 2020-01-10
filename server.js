var express = require("express");
var cors = require("cors");
var bodyParser=require("body-parser");

var app=express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
var port =process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

var Users=require('./routes/Users');
var Objects=require('./routes/Objects')
var Notifications=require('./routes/Notification')

app.use('/users',Users);
app.use('/objects',Objects);
app.use('/notifications',Notifications)


app.listen
(
    port,() =>
    {
        console.log("Server is running on port: "+port);
    }
);
