const { _getUsersLeaderboard } = require("../models/leaderboard.model");

const showLeaderboard = async (req, res) => {
    try {
        const data = await _getUsersLeaderboard()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "not found" })
    }
};

module.exports = { showLeaderboard };