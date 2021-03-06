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

notifications.post('/getAllNotification',(req,res)=>
{
    let sql=`select * from notification where idu=${req.body.idu}`;
    let query=db.query(sql,(err,results)=>
    {
        console.log(results);
        res.send(results);
    });
})

notifications.post('/delete',(req,res)=>
{
    let sql=`DELETE FROM notification WHERE id=${req.body.id}`;
    let query=db.query(sql,(err,result)=>
    {
        if(err)throw err;
        console.log('notification deleted ...');
        res.send('Notification deleted ...');
    });
})
module.exports =notifications