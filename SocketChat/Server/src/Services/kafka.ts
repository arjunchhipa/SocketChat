import { Kafka , Producer } from 'kafkajs';
import fs from 'fs'
import path from 'path'

const kafka = new Kafka({
    brokers : [process.env.KAFKABROKER],
    ssl : {
        ca : [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")]
    },
    sasl : {
        username : "avnadmin",
        password : process.env.KAFKAPASS,
        mechanism : "plain"
    }
})

let producer : null | Producer = null;


export async function CreateProducer(){
    if(producer) return producer;

    const _producer = kafka.producer()
    await _producer.connect()
    producer = _producer
    return producer;
}

interface ChatMessage {
    MsgId: string;
    ActualMessage: string;
    SendedBy: string;
    Timestamp: string;
}

export async function ProduceMessages(chatid : string , msg : ChatMessage){
    // Convert the object to a JSON string
    const jsonString = JSON.stringify(msg);
    // Convert the JSON string to a Buffer
    const bufferValue = Buffer.from(jsonString);

    const producer = await CreateProducer();
    producer.send({
        messages : [{ key : chatid , value : bufferValue}],
        topic : "MESSAGES"
    })
    return true;
}


export default kafka;
