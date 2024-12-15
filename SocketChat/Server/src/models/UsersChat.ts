import mongoose, { Schema, Document } from "mongoose";
import { v4 as uniqueId } from "uuid";

interface IChat extends Document {
  chatid: string;
  chatname: string[];
  lastmsg: string;
  users: string[];
}


const chatSchema: Schema = new Schema({
  chatid: { type: String, default: uniqueId, unique: true },
  chatname: { type: [String], required: true },
  lastmsg: { type: String, default: "Start Chatting Now!" },
  users: { type: [String], required: true },
  sender : { type : Boolean, required : true}
});

const UserChat = mongoose.model<IChat>("userschat", chatSchema);

export default UserChat;
