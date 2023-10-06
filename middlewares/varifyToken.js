const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization
    console.log("MY VERIFY TOKEN=>", token)
    if (!token) return res.status(401).json({ msg: "not authorized" })
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) return res.status(403).json({ msg: "verify token failed" });
        req.user = decode;
        console.log("IN VARIFY =>>>>>>>>", req.user)
        next();
    });
};

module.exports = { verifyToken };