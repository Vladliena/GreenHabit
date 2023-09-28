const { _register, _login, _getAllUsers } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();




const showAllUsers = async (req, res) => {
    try {
        const data = await _getAllUsers()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "nothing found" })
    }

}

const register = async (req, res) => {
    const { first_name,
        last_name,
        username,
        email,
        password
    } = req.body;
    const lower_email = email.toLowerCase();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password + '', salt);
    try {
        const row = await _register(first_name, last_name, username, lower_email, hash)
        res.json(row)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "user already exits" })
    }
};

const login = async (req, res) => {
    try {
        const row = await _login(req.body.username)
        if (row.length === 0) return res.status(404).json({ msg: "user not found" })
        const match = await bcrypt.compare(req.body.password + '', row[0].password)
        if (!match) return res.status(404).json({ message: "wrong password" })
        const userid = row[0].user_id;
        const username = row[0].username;
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const accessToken = jwt.sign({ userid, username }, secret, { expiresIn: "60s" });
        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000,
        });
        res.json({ token: accessToken })
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "something went wrong" })
    }
};

module.exports = { showAllUsers, register, login };