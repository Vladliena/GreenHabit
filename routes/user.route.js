const express = require("express");
const { showAllUsers, login, register, findUser } = require("../controllers/user.controller")
const { verifyToken } = require("../middlewares/varifyToken")
const u_router = express.Router();


u_router.get("/", showAllUsers);
u_router.get("/user-info", verifyToken, findUser)
u_router.post("/register", register);
u_router.post("/login", login);
u_router.get("/verify", verifyToken, (req, res) => {
    res.sendStatus(200);
});
u_router.get("/logout", (req, res) => {
    res.clearCookie("token");
    req.user = null;
    res.sendStatus(200);
});


module.exports = { u_router }