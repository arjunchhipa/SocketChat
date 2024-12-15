import { Request , Response} from 'express';
import UserChat  from '../models/UsersChat'
const USERS = require("../models/user");


async function Adduser(req : Request , res : Response){
      
      const senderdetail = await USERS.findOne({Email : req.body.SendersMail})
      const DoesExists = await USERS.findOne({Email : req.body.Useremail})

      if (!DoesExists){
            return res.status(400).json({msg : "Email not found"})
      }

      if (req.body.SendersMail === DoesExists.Email) {
            return res.status(400).json({ msg: "Can't Add Yourself" });
      }

      const DoesChatExists = await UserChat.findOne({
            users: { $all: [req.body.SendersMail, DoesExists.Email] }
      }); if (DoesChatExists){
            return res.status(400).json({msg : "Chat Already Exists"})
      }

      const NewUserChat = new UserChat({
            chatname : [
                  senderdetail.Username,
                  DoesExists.Username,
            ] ,
            users : [
                  req.body.SendersMail,
                  DoesExists.Email,
            ],
            sender : true
      });

      NewUserChat.save();
      return res.status(200).json({
             msg : 'chat added succesfully',
             chatname : DoesExists.Username,
             chatlogo : DoesExists.Username.charAt(0),
             lastmsg : "start chatting now"
      })
}

module.exports = {
        Adduser,
};
  