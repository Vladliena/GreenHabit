const { db } = require("../config/db");


const _getAllUsers = () => {
    return db("users").select("user_id", "first_name", "last_name", "username", "email", "avatar").orderBy("first_name")
}

const _getUser = (username) => {
    return db.select("user_id", "first_name", "last_name", "username", "email", "avatar")
        .from("users")
        .where({ username })
}

const _register = (first_name, last_name, username, email, password) => {
    return db("users")
        .insert({ first_name, last_name, username, email, password })
        .returning(["user_id", "first_name", "last_name", "username", "email", "avatar"])
};

const _insertAvatar = (avatar, username) => {
    console.log(username, avatar)
    return db("users")
        .update({ avatar })
        .where({ username })
        .returning(["user_id", "first_name", "last_name", "username", "email", "avatar"])

}

const _login = (username) => {
    return db("users")
        .select("user_id", "first_name", "last_name", "username", "email", "password", "avatar")
        .where({ username })
};

module.exports = {
    _getAllUsers,
    _register,
    _insertAvatar,
    _getUser,
    _login
};