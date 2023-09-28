const { db } = require("../config/db");


const _getAllUsers = () => {
    return db("users").select("user_id", "first_name", "last_name", "username", "email").orderBy("first_name")
}

const _register = (first_name, last_name, username, email, password) => {
    return db("users")
        .insert({ first_name, last_name, username, email, password })
        .returning(["user_id", "first_name", "last_name", "username", "email"])
};

const _login = (username) => {
    return db("users")
        .select("user_id", "first_name", "last_name", "username", "email", "password")
        .where({ username })
};

module.exports = {
    _getAllUsers,
    _register,
    _login
};