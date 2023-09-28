const { _getAllUsersResults,
    _insertUserResult,
    _getUserResultByUserId } = require("../models/userresult.model");

const showAllUserResults = async (req, res) => {
    try {
        const data = await _getAllUsersResults()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "nothing found" })
    }
};

const insertUserResult = async (req, res) => {
    try {
        const data = await _insertUserResult(req.body)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: err.message })
    }
};

const searchUserResult = async (req, res) => {
    const { id } = req.params
    try {
        const data = await _getUserResultByUserId(id)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "user not found" })
    }
};

module.exports = {
    showAllUserResults,
    insertUserResult,
    searchUserResult
};
