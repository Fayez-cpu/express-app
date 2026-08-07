import jwt from 'jsonwebtoken'

export const generateToken = (userid, res) => {
    const payload = {id: userid}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY || "7d",
    })
    const isProduction = process.env.NODE_ENV === "production"
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: (1000 * 60 * 60 * 24) * 7
    });
    return token;
}