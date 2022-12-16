//type = "modules" in package.json adding it enables the use of ES6 modules now we can use import in place of require
// import express from 'express';
const e = require("express");
const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose");
const Messages = require("./models/dbMessages")
const app = express();

const port = 3000 ||process.env.PORT; 

app.use(express.json());


mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connection successful")
}).catch((e) => {
    console.log(e);
})

app.get('/', (req, res) => {
    res.status(200).send("hello world")
})

//Adding new messages
app.post('/messages/new', async(req, res) => {
    const dbMessage = req.body;
    console.log(dbMessage);
    try{
        const create = await Messages.create(dbMessage);
        console.log(create);
        res.status(201).send(`new message created: \n ${create}`)
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);

    }
})

//getting all the messages
app.get('/messages/sync', async(req, res) => {

    try{
        const messages = await Messages.find({});
        console.log(messages)
        res.status(200).send(messages);
        
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

app.listen(port, () => {
    console.log(`listening to ${port}`);
})