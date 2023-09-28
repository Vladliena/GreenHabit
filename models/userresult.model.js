const { db } = require("../config/db");

const _getAllUsersResults = () => {
    return db("users_results")
        .select("result_id", "user_id", "date", "waste_size_total")
        .orderBy("date")
};

const _insertUserResult = ({ user_id, date, waste_size_total }) => {
    return db("users_results")
        .insert({ user_id, date, waste_size_total }, ["result_id", "user_id", "date", "waste_size_total"])
};

const _getUserResultByUserId = (id) => {
    return db.select("result_id", "user_id", "date", "waste_size_total")
        .from("users_results")
        .where({ user_id: id })
};

module.exports = {
    _getAllUsersResults,
    _insertUserResult,
    _getUserResultByUserId
};