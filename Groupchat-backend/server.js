//type = "modules" in package.json adding it enables the use of ES6 modules now we can use import in place of require

//Why are we using pusher?
//We use firebase to make real time applications(use of socket io). But we can't do that with mongodb, we have to refresh it again and again after any change is made(or after a message is created or deleted we need to refresh then only it will get reflected), but pusher is a service which makes mongodb real time .
//What we will do is , we will introduce changeStream in mongodb , so whenever there is a change in any collection at that time the change stream is going to trigger the pusher that is upload that message on pusher and we connect the pusher to our frontend.Pusher server will trigger down the data and push it to frontend.--> makes it real time.



const e = require("express");
const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose");
const Messages = require("./models/dbMessages")
const app = express();
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1526204",
    key: "ed94a8b9ce8932a13626",
    secret: "4e710500647870d6359e",
    cluster: "ap2",
    useTLS: true
  });


  const db = mongoose.connection;
  db.once("open", () => {
    console.log("db connected");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log("change:",change);
        if(change.operationType === "insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {     
                name: messageDetails.name,
                message: messageDetails.message
            });
        }else{
            console.log("Error triggering pusher");
        }
    })
  })


//Used to handle CORS error. We will allow request to come from any end point.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

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