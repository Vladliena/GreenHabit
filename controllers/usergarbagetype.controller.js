const { _getUsersGarbageTypes, _getUsersGarbageById } = require("../models/usergarbagetype.model");


const showUsersGarbageTypes = (req, res) => {
    try {
        const data = _getUsersGarbageTypes()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "nothing found" })
    }
};

const showUserGarbageTypesById = (req, res) => {
    const { id } = req.params
    try {
        const data = _getUsersGarbageById(id)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "nothing found" })
    }
};

module.exports = { showUsersGarbageTypes, showUserGarbageTypesById };