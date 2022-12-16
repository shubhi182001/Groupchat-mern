//type = "modules" in package.json adding it enables the use of ES6 modules now we can use import in place of require
// import express from 'express';
const express = require("express")
const mongoose = require("mongoose");
const Messages = require("./models/dbMessages")
const app = express();

const port = 3000 ||process.env.PORT; 

app.use(express.json());


mongoose.set("strictQuery", true);
const connection_url = "mongodb+srv://admin:shubhi@cluster0.qit4kay.mongodb.net/groupchatdb?retryWrites=true&w=majority"
mongoose.connect(connection_url , (e) =>{
    console.log("erro",e);
})

app.get('/', (req, res) => {
    res.status(200).send("hello world")
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})

app.listen(port, () => {
    console.log(`listening to ${port}`);
})