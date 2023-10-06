const { _getUsersGarbageTypes, _getUsersGarbageById, _insertUserGarbageType, _getFriendData } = require("../models/usergarbagetype.model");


const showUsersGarbageTypes = async (req, res) => {
    try {
        const data = await _getUsersGarbageTypes()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "nothing found" })
    }
};

const showFriendData = async (req, res) => {
    const { name } = req.params
    try {
        const data = await _getFriendData(name)
        res.json(data)

    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "nothing found" })
    }
}

const showUserGarbageTypesById = async (req, res) => {
    let currentMonth = new Date()
    currentMonth.setDate(currentMonth.getDate() + 1);
    let curentMonthePlusDay = currentMonth.toJSON().slice(0, 10)

    let currentMonthforPrev = new Date()
    currentMonthforPrev.setMonth(currentMonthforPrev.getMonth() - 1);
    let previousMonth = currentMonthforPrev.toJSON().slice(0, 10);

    const { id } = req.params
    try {
        const data = await _getUsersGarbageById(id, previousMonth, curentMonthePlusDay)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "nothing found" })
    }
};

const addUserGarbageType = async (req, res) => {
    await req.body.map(async (item) => {
        try {
            await _insertUserGarbageType(item.user_id, item.garbage_id, item.weight)
        } catch (err) {
            console.log(err)
            res.status(404).json({ msg: "user already exits" })
        }
    })
};

module.exports = { showUsersGarbageTypes, showUserGarbageTypesById, addUserGarbageType, showFriendData };