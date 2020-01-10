const express = require('express');
const mysql=require('mysql');
const path=require('path');


//create connection

const db=mysql.createConnection
(
    {
        host: 'localhost',
        user: 'root',
        password:'',
        database: 'nodemysql'
    }
);

//Connect
db.connect
(
    (err)=>
    {
        if(err)
        {
            throw err;
        }
        console.log('MySql connected ...');
    }
);
//*******************************
const app=express();
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(express.json());
//*****************************we should add this instruction we should use the command npm i cors
//Create database
app.get
(
    '/createdb',(req,res)=>
    {
        let sql='CREATE DATABASE nodemysql';
        db.query
        (
            sql,(err,result)=>
            {
                if(err) throw err;
                console.log('Database created ...');
            }
        );
    }
);

app.post
(
    '/test',(req,res)=>
    {
        console.log('GOT A REQUEST from the front-end');
        //console.log(user);
        console.log('The email is '+req.body.email);
        res.send("Good");
        res.end('Success');
    }
);

//Create table
app.get
(
    '/createpoststable' , (req,res)=>
    {
        let sql='CREATE TABLE post (id int PRIMARY KEY AUTO_INCREMENT  , title varchar(255) , body varchar(255))';
        db.query
        (
            sql,(err,result)=>
            {
                if(err)throw err;
                console.log(result);
                res.send('Post table created ....');
            }
        );
    }
);

//insert a post
app.get
(
    '/addPost',(req,res)=>
    {
        let post={title :'The Post 11' , body: 'This is a post of Habib Aroua'};
        let sql='INSERT INTO post SET ?';
        let query=db.query
        (
            sql,post,(err,result)=>
            {
                if(err)throw err;
                res.send('This post added ....');
                console.log('This post added ...');
            }
        );
    }
);

//select post
app.get
(
    '/getPosts',(req,res)=>
    {
        let sql='SELECT * FROM post';
        let query=db.query
        (
            sql,(err,results)=>
            {
                console.log(results);
                res.send(results);
            }
        );
    }
);

//find by id
app.get
(
    '/getPosts/:id',(req,res)=>
    {
        let sql=`SELECT * FROM post WHERE id = ${req.params.id}`;
        let query=db.query
        (
            sql,(err,result)=>
            {
                if(err)throw err;
                res.send(result);
                console.log(result);
            }
        );
    }
);

//update post
app.get
(
    '/update/:id',(req,res)=>
    {
        let newTitle='Update post'
        let sql=`UPDATE post SET title = '${newTitle}' WHERE id=${req.params.id}`;
        let query=db.query
        (
            sql,(err,result)=>
            {
                if(err)throw err;
                console.log(result);
                res.send('Post updated ...');
            }
        );
    }
);

//Delete post
app.get
(
    '/delete/:id',(req,res)=>
    {
        let sql=`DELETE FROM post WHERE id=${req.params.id}`;
        let query=db.query
        (
            sql,(err,result)=>
            {
                if(err)throw err;
                console.log(result);
                res.send('Post deleted ...');
            }
        );
    }
);

app.get
(
    '/',function(req,res) 
    {
        res.sendFile('index.html', { root: __dirname });
    }
);

app.listen('5000',()=>
{
    console.log('Server started on port 5000');
});
