import jwt from 'jsonwebtoken'
import { db } from '../database/connect';

export const authMiddleware = async(req, res, next) => {
    console.log("auth middleware")
    let token
    if (req.cookies?.jwt){
        token = req.cookies.jwt
        console.log("token found in cookies")
    }
    
    else{
        return res.status(401).json({error: "Not authorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded token", decoded)
        const user = await db.oneOrNone('SELECT name,email,id from users WHERE id = $1', [decoded.id])
        if (!user){
            return res.status(401).json({error: "Not authorized, error"})
        }
        req.user = user
        next()
    }
    catch(error){
        console.log(error)
        return res.status(401).json({error: "Not authorized, error"})
    }
}





