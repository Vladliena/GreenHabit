const { db } = require("../config/db");

const _getUsersLeaderboard = () => {
    return db("leaderboard").select("leaderboard_id", "user_id", "total_size_all", "last_updated").orderBy("last_updated").limit(5)
};

module.exports = { _getUsersLeaderboard };