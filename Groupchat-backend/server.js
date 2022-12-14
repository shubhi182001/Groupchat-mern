//type = "modules" in package.json adding it enables the use of ES6 modules now we can use import in place of require
import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3000 ||process.env.PORT; 

mongoose.set("strictQuery", true);
const connection_url = "mongodb+srv://admin:Shubhi%401801@cluster0.qit4kay.mongodb.net/groupchatdb?retryWrites=true&w=majority"
mongoose.connect(connection_url , () =>{
    console.log("connected to mongodb");
})

app.get('/', (req, res) => {
    res.status(200).send("hello world")
})

app.listen(port, () => {
    console.log(`listening to ${port}`);
})