import kafka from "./kafka";
const { SaveMessages } = require('../controllers/Messages')

export async function StartMessageConsumer(){
    const consumer = kafka.consumer({ groupId : "default"});
    await consumer.connect();
    await consumer.subscribe({ topic : "MESSAGES"});

    await consumer.run({
        autoCommit : true,
        eachMessage : async ({message, pause}) => {
            try{
                const messageValue = message.value.toString('utf-8');
                const parsedMessage = JSON.parse(messageValue);
                SaveMessages(parsedMessage);
            } catch(err){
                console.log("Something is worng")
                pause();
                setTimeout(() => { consumer.resume([{topic : 'MESSAGES'}]) }, 1000*60)
            }
        }
    })

}