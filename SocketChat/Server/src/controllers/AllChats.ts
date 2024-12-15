import { Request, Response } from "express";
import UserChat  from '../models/UsersChat'
const  USERS = require('../models/user')

async function GetAllTheChats(req : Request,res : Response){

    const conversations = await UserChat.find({
        users: {
            $size: 2,
            $elemMatch: {
              $in: [req.body.SendersMail],
            },
          },
      });

    const SendersInfo = await USERS.findOne({ Email : req.body.SendersMail});
    res.status(200).json({
        msg : "All gud",
        conversations : conversations,
        you : SendersInfo.Username,
        yourmail : SendersInfo.Email
    })
}


module.exports = {
    GetAllTheChats,
}