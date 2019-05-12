const express = require('express')
const objects = express.Router()
const jwt = require('jsonwebtoken')
const cors=require('cors')
const notifications = express.Router()
const bcrypt=require('bcrypt')
var mysql = require('mysql');

const db=mysql.createConnection
(
    {
        host: 'localhost',
        user: 'root',
        password:'',
        database: 'iomt'
    }
);

notifications.use(cors())

process.env.SECRET_KEY='secret'

notifications.post('/nbNotification',(req,res)=>
{
    let sql=`select count(*) as nb from notification where idu=${req.body.idu}`;
    let query=db.query(sql,(err,results)=>
    {
        console.log("the value is "+results[0].nb);
        const x=results[0].nb;
        res.send(x.toString())
    });
})

module.exports =notifications