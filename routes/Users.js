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


var nodemailer = require('nodemailer');


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
                        .then(user =>
                        {
                            console.log("res.json({status: user.email+ ' registered'})");
                            res.send("x1")
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                secure: false ,
                                port : 25 ,
                                auth: {
                                    user: 'habibha.aroua82@gmail.com',
                                    pass: 'habib.aroua@hotmail.framour88'
                                }, tls: {
                                    rejectUnauthorized: false
                                }
                            });
                            //https://myaccount.google.com/lesssecureapps security
                            var mailOptions = {
                                from: 'habibha.aroua82@gmail.com',
                                to: user.email,
                                subject: 'Welcome to our group',
                                text: 'Congratulations you are active member in our group'
                            };

                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        })
                })
            }
            else
            {
                res.send("x2");
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

users.post('/updateUsers',(req,res)=>
{
    const userData =
    {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        rule:1,
        password:req.body.password
    }

    let first_name=userData.first_name;
    let last_name=userData.last_name;
    let sql=`UPDATE users SET first_name = '${first_name}' , last_name='${last_name}' WHERE email='${userData.email}' `;
    let query=db.query(sql,(err,result)=>
    {
        if(err)throw err;
        console.log(result);
        res.send('user updated ...');
    });
})


users.post('/updateUsersPassword',(req,res)=>
{
    var test=((bcrypt.compareSync(req.body.password,req.body.cryptPassword))); //comparer deux password wa7da crypté w lo5ra non crypté
    if(test)
    {
        bcrypt.hash(req.body.newPassword, 10,(err,hash)=>
        {
            let sql = `UPDATE users SET password = '${hash}' WHERE email='${req.body.email}' `;
            let query = db.query(sql, (err, result) =>
            {
                if (err) throw err;
                console.log(result);
                res.send('x1'); //Password updated
                console.log('Password updated')
            });
        });
    }
    else
    {
        res.send("x2") //Password is not correct
        console.log('Password is not correct');
    }
})

users.get('/AllSimpleUsers',(req,res)=>
{
    let sql='SELECT * FROM users where rule=1';
    let query=db.query(sql,(err,results)=>
    {
        res.send(results);
    });
});

users.post('/DeleteUser',(req,res)=>
{
    let sql=`DELETE FROM users WHERE id=${req.body.id}`;
    let query=db.query(sql,(err,result)=>
    {
        if(err)throw err;
        console.log('user deleted ...');
        res.send('user deleted ...');
    });
});

module.exports =users