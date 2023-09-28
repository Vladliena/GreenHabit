const { db } = require("../config/db");

const _getUsersGarbageTypes = () => {
    return db("users_garbage_types").select("user_garbage_id", "user_id", "garbage_id", "date", "garbage_type_waste_total").orderBy("user_id")
};

const _getUsersGarbageById = (id) => {
    return select("user_garbage_id", "user_id", "garbage_id", "date", "garbage_type_waste_total")
        .from("users_garbage_types")
        .where({user_id:id})
};

module.exports = { _getUsersGarbageTypes, _getUsersGarbageById };