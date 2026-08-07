import 'dotenv/config';
import { db } from '../database/connect';

export const dashboard = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({error: "Not authorized"})
    }
    const name = req.user.name
    const email = req.user.email
    return res.status(200).json({message: "Dashboard data", user: {name, email}})
}
    