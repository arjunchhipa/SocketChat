const express = require('express');
const http = require('http')
const socketIO = require('socket.io');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config()
const jsonParser = bodyParser.json();
import { Socket } from "socket.io";
import { Redis } from "ioredis";
import { ProduceMessages } from './Services/kafka'
import { StartMessageConsumer } from './Services/consumer'

    StartMessageConsumer();

const pub = new Redis({
    host : process.env.REDISHOST,
    port : 25896,
    username : 'default',
    password : process.env.REDISPASS
});

const sub = new Redis({
    host : process.env.REDISHOST,
    port : 25896,
    username : 'default',
    password : process.env.REDISPASS
});

sub.subscribe('MESSAGES');




const app = express();
const server = http.createServer(app, {
    cors: {
        cors: {
            origin: ['http://localhost:3000', 'https://socket-chat-client-lbl3.onrender.com'], 
            credentials: true
          }
      }
});


const io = socketIO(server);
const connectMongoAtlas = require('./connection');

const port = process.env.PORT || 8080;


const { SaveMessages } = require('./controllers/Messages');


// here the first parameter 'message'is a event listener which triggers when ever new data is pushed over to subscribed channels 
// the two arguments '(channel,message)' -> here channel is a simple string which will be the channel name on which the data was recieved
// the sencond argumnet message(just a alies for the data) it it the actual json which was recieved 

sub.on('message', async (channel,message) => {
    if(channel === 'MESSAGES'){
        const parsedMessage = JSON.parse(message);
        const { chatid, msg } = parsedMessage;
        io.of('/socket').to(chatid).emit("recieve-msg", msg)
        await ProduceMessages(chatid, msg)
    } else {
        console.log(`Received message from unexpected channel: ${channel}`);
      }
})


io.of('/socket').on('connection', (socket : Socket) => {
    console.log('Someone connected with socket id :', socket.id);
    socket.on('send-message', async (msg : string , chatid : string) => {
        await pub.publish('MESSAGES', JSON.stringify({msg , chatid}))
    })

    socket.on("pv-chat", (room : string) => {
        socket.join(room)
    })

    socket.on('leave-prev-chat', () => {
    
        const rooms = socket.rooms       
        rooms.forEach((room) => {
            if(room !== socket.id){
                socket.leave(room);
            }
        });
    })


    socket.on('disconnect', () => {
        console.log('Someone disconnected with id' , socket.id);
    });
})




app.use(cors());
app.use(jsonParser);


connectMongoAtlas(process.env.MONGO_CONNECTION_STRING);

const auth = require('./routes/Authorisation');
app.use("/", auth);

const add = require('./routes/Adduser');
app.use("/add", add)

const AllChats = require('./routes/AllChats');
app.use("/allchats", AllChats)

server.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

