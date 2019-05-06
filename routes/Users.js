const express = require('express')
const users = express.Router()
const jwt = require('jsonwebtoken')
const cors=require('cors')
const bcrypt=require('bcrypt')
const User=require("../models/User")
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

users.use(cors())

process.env.SECRET_KEY='secret'

users.get('/test',(req,res)=>
{
    res.send("This test page");
})
users.post('/register',(req,res)=>
{
    const today=new Date()
    const userData =
        {
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            rule:1,
            password:req.body.password,
            created: today
        }
    User.findOne({
        where:
            {
                email: req.body.email
            }
    })
        .then(user=>{
            if(!user)
            {
                bcrypt.hash(req.body.password, 10,(err,hash)=>{
                    userData.password=hash
                    User.create(userData)
                        .then(user =>{
                            //res.json({status: user.email+ ' registered'})
                            console.log("res.json({status: user.email+ ' registered'})");
                            res.send("res.json({status: user.email+ ' registered'})")
                        })
                })
            }

            else
            {
                //res.json({error: "User already exists"})
                res.send("error: User already exists");
                console.log("error: User already exists");
            }
        })
        .catch(err=>{
            res.send('error: '+err)
        })
})

users.post('/login',(req,res)=>
{

    User.findOne(
        {
            where:
                {
                    email: req.body.email
                }
        })
        .then(user=>
        {
            if(user.email==req.body.email)
            {
                if(bcrypt.compareSync(req.body.password,user.password))
                {
                    console.log("password is correct inst 1");
                    let token = jwt.sign(user.dataValues,process.env.SECRET_KEY , {
                        expiresIn: 1440
                    })
                    console.log("password is correct inst 2");
                    res.send(token)
                }
                else
                {
                    res.status(400).json({error: 'Password is not correct'})
                    console.log("password is not correct")
                }
            }
            else
            {
                console.log("User is not exist");
                res.status(400).json({error: 'User does not exist'})
            }
        })
        .catch(err=>
        {
            res.status(400).json({error: err})
        })
})

users.get('/AllUsers',(req,res)=>
{
    let sql='SELECT * FROM users';
    let query=db.query(sql,(err,results)=>
    {
        res.send(results);
    });
})

users.get('/updateUsers',(req,res)=>
{
    const userData =
        {
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            rule:1,
            password:req.body.password
        }
        //$2b$10$ADQJEK5cDLd5vedn5Ryfx.TI0nj5kgN1gotfs.bjzwYou64neQ3BK
        //$2b$10$ADQJEK5cDLd5vedn5Ryfx.TI0nj5kgN1gotfs.bjzwYou64neQ3BK

    bcrypt.hash("123", 10,(err,hash)=> {
        userData.password = hash
        res.send(userData.password)
    })
})
module.exports =users