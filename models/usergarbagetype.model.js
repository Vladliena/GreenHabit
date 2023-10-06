const { db } = require("../config/db");

const _getUsersGarbageTypes = () => {
    return db("users_garbage_types as ugt")
        .select(
            "ugt.user_id",
            db.raw("RANK() OVER (ORDER BY SUM(ugt.garbage_type_waste_total) ASC) as rank"),
            db.raw("SUM(ugt.garbage_type_waste_total) as total"),
            "u.avatar",
            "u.username"
        )
        .join("users as u", "ugt.user_id", "u.user_id")
        .groupBy("ugt.user_id", "u.avatar", "u.username")
        .orderBy("total", "asc");
};

const _getFriendData = (name) => {
    return db("users as u")
    .select("u.username", "u.avatar")
    .sum("ugt.garbage_type_waste_total as total")
    .join("users_garbage_types as ugt", "u.user_id", "ugt.user_id")
    .where("username", name)
    .groupBy("u.username", "u.avatar")
}

// const _getUsersGarbageById = (id, previousMonth, curentMonthePlusDay) => {
//     return db("users_garbage_types as ugt")
//         .select("gt.type as type", "ugt.date as date", "ugt.garbage_type_waste_total as total")
//         .join("garbage_type as gt", "ugt.garbage_id", "gt.garbage_id")
//         .whereBetween("ugt.date", [previousMonth, curentMonthePlusDay])
//         .where({ user_id: id })
//         .orderBy("ugt.date")
// };

const _getUsersGarbageById = (id, previousMonth, curentMonthePlusDay) => {

    return db("users_garbage_types as ugt")
        .select("gt.type as type", "ugt.date as date")
        .sum("ugt.garbage_type_waste_total as total")
        .join("garbage_type as gt", "ugt.garbage_id", "gt.garbage_id")
        .whereBetween("ugt.date", [previousMonth, curentMonthePlusDay])
        .where({ user_id: id })
        .groupBy("gt.type", "ugt.date")
        .orderBy("ugt.date")
};

const _insertUserGarbageType = (user_id, garbage_id, garbage_type_waste_total) => {
    return db("users_garbage_types")
        .insert({ user_id, garbage_id, garbage_type_waste_total })
        .returning(["user_garbage_id", "user_id", "garbage_id", "date", "garbage_type_waste_total"])
}

module.exports = { _getUsersGarbageTypes, _getUsersGarbageById, _insertUserGarbageType, _getFriendData };