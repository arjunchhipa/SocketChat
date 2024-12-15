var jwt = require('jsonwebtoken');
import { Request , Response , NextFunction } from 'express'

module.exports = {
    auth : (req : Request, res : Response , next : NextFunction) => {
        const Authheader = req.headers.authorization;
        const decoded_token = jwt.decode(Authheader, process.env.TOKEN_SECRET)
        if(decoded_token != null){
            req.body.SendersMail = decoded_token.Mail;
            next();
        } else{
            res.status(401).json({msg : 'Access Denied'})
        }
    }
}