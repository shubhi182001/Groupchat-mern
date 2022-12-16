//type = "modules" in package.json adding it enables the use of ES6 modules now we can use import in place of require
// import express from 'express';
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

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;
    console.log(dbMessage);
    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err);
            console.log(err)
        }
        else{
            console.log(data);
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})

app.listen(port, () => {
    console.log(`listening to ${port}`);
})