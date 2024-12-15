import mongoose, { Schema, Document } from 'mongoose';

interface IMessage extends Document {
  ActualMessage: string;
  Time: string;
  Username: string;
  Chatid: string;
}

const messagesSchema: Schema<IMessage> = new Schema({
  ActualMessage :{
    type : String,
    required : true,
  },
  Time: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  Chatid: {
    type: String,
    required: true,
  },
});

const MESSAGES = mongoose.model<IMessage>('Message', messagesSchema);

module.exports = MESSAGES;
