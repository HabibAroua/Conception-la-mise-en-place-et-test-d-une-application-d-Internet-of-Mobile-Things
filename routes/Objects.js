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

function show(x)
{
    return "Watashi wa Habib Desu and "+x;
}
objects.get('/test',(req,res)=>
{
    res.send(show("Satomi"));
})

objects.get('/AllObjects',(req,res)=>
{
    let sql='SELECT * FROM object';
    let query=db.query(sql,(err,results)=>
    {
        console.log(results);
        res.send(results);
    });
})

module.exports =objects