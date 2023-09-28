const {
    _getAllWasteTypes,
    _insertWasteType,
    _searchWasteTypeByName,
    _updateWasteTypeById,
    _deleteWasteTypeById
} = require("../models/waste.model");

const getAllWasteTypes = async (req, res) => {
    try {
        const data = await _getAllWasteTypes()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "nothing found" })
    }
};

const createWasteType = async (req, res) => {
    try {
        const data = await _insertWasteType(req.body)
        _getAllWasteTypes(req, res)

    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: err.message })
    };
};

const searchWasteType = async (req, res) => {
    try {
        const data = await _searchWasteTypeByName(req.query.type)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "nothing found" })

    }
};

const updateWasteType = async (req, res) => {
    const { id } = req.params
    try {
        const data = await _updateWasteTypeById(req.body, id)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: err.message })
    }
};

const deleteWasteType = async (req, res) => {
    const { id } = req.params
    try {
        const data = await _deleteWasteTypeById(id)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: err.message })
    }
};

module.exports = { getAllWasteTypes, createWasteType, searchWasteType, updateWasteType, deleteWasteType };