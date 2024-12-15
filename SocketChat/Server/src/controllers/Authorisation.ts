import { Request, Response } from "express";
const USERS = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt


async function userlogin(req: Request, res: Response) {
 
  try{
      const { Mail , Pass} = req.body;

      if(!Mail || !Pass) {
          return res.status(400).json({msg : "Please provide all required fields"})
      }

      const CheckUser = await USERS.findOne({Email : Mail})
      
      if (CheckUser === null || !CheckUser || CheckUser === undefined){
          return res.status(400).json({msg : "Email not found"})
      } else {

          const passwordMatch = await bcrypt.compare(Pass, CheckUser.Password);
          
          if(passwordMatch){
             const token = await jwt.sign({ Mail: CheckUser.Email }, process.env.TOKEN_SECRET);
              return res.status(200).json({
                msg : 'Authentication successful',
                token : token,
                room : CheckUser.Room
            })
          } else {
              return res.status(401).json({msg : 'Invalid password'})
          }
      }
  } catch (error) {
      console.error('Error' , error);
      return res.status(500).json({msg: 'Internal server error'});
  }
}

async function usersignup(req: Request, res: Response) {
  try {
    const { Name, Mail, Pass } = req.body;

    if (!Name || !Mail || !Pass) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Mail)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }



    const ExistingUser = await USERS.findOne({
      $or: [
        { Email: req.body.Mail },
        { Username: req.body.Name }
      ]
    });

    if (ExistingUser) {
      return res.status(403).json({ msg: "Email or Username Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(Pass, saltRounds);

    const Newuser = new USERS({
      Username: Name,
      Email: Mail,
      Password: hashedPassword,
    });

    Newuser.save();

    return res.json({ msg: "Success" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function redirectauth(req : Request, res : Response){
      res.status(200).json({msg : 'Authentication succesful'})
}

module.exports = {
  userlogin,
  usersignup,
  redirectauth
};
