const express = require("express")
const { showLeaderboard } = require("../controllers/leaderboard.controller")
const l_router = express.Router()

l_router.get("/", showLeaderboard)


module.exports = { l_router }