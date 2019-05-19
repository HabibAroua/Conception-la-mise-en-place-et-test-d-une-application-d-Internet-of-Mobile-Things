const express = require('express')
const objects = express.Router()
const jwt = require('jsonwebtoken')
const cors=require('cors')
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

objects.use(cors())

process.env.SECRET_KEY='secret'

objects.get('/AllObjects',(req,res)=>
{
    let sql='SELECT * FROM object';
    let query=db.query(sql,(err,results)=>
    {
        res.send(results);
    });
})

objects.get('/AllState',(req,res)=>
{
    let sql='select state from object order by id';
    let query=db.query(sql,(err,results)=>
    {
        res.send(results);
    });
})

objects.get('/AllWording',(req,res)=>
{
    let sql='select wording , state , (state/init_state)*100 as taux from object order by id';
    let query=db.query(sql,(err,results)=>
    {
        res.send(results);
    });
})

module.exports =objects