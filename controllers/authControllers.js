import 'dotenv/config';
import { db } from '../database/connect';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

export const signup = async (req,res) => {
    const {name, email, password} = req.body;
    const userExists = await db.oneOrNone('SELECT id from users WHERE email = $1', [email])
    if (userExists){
        return res.status(400).json({error: "Email already registered"})
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword =  await bcrypt.hash(password, salt)
    const user = await db.one('INSERT into users (email,name,password_hash) VALUES ($1, $2, $3) RETURNING *', [email, name,hashedPassword])
    console.log(user)
    return res.status(200).json({message: "Registered Successfully"})
}

export const login = async (req,res) => {
    const {email,password} = req.body
    const userExists = await db.oneOrNone('SELECT id,name, password_hash from users WHERE email = $1', [email])
    if (!userExists){
        return res.status(400).json({error: "Email or password incorrect"})
    }
    const isCorrect = await bcrypt.compare(password, userExists.password_hash)
    if (!isCorrect){
        return res.status(400).json({error: "Email or password incorrect"})
    }

    const token = generateToken(userExists.id, res)
    return res.status(200).json({message: "logged in", user: {id: userExists.id, email: email, name: userExists.name}})

}


export const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        status:"success",
        message: "Logged out successfully",
    })
} 