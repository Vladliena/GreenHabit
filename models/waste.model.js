const { db } = require("../config/db.js");

const _getAllWasteTypes = () => {
    return db("garbage_type").select("garbage_id", "type", "recycled", "s_size", "m_size", "l_size").orderBy("type")
};

const _insertWasteType = ({ type, recycled, s_size, m_size, l_size }) => {
    return db("garbage_type").insert({ type, recycled, s_size, m_size, l_size }, ["garbage_id", "type", "recycled", "s_size", "m_size", "l_size"])
};

const _searchWasteTypeByName = (type) => {
    return db.select("garbage_id", "type", "recycled", "s_size", "m_size", "l_size").from('garbage_type')
        .where({ type })
};

const _updateWasteTypeById = ({ type, recycled, s_size, m_size, l_size }, id) => {
    return db("garbage_type")
        .update({ type, recycled, s_size, m_size, l_size })
        .where({ garbage_id: id })
        .returning(["type", "recycled", "s_size", "m_size", "l_size"])
};

const _deleteWasteTypeById = (id) => {
    return db("garbage_type").where({ garbage_id: id }).del().returning(["garbage_id", "type", "recycled", "s_size", "m_size", "l_size"])
};

module.exports = {
    _getAllWasteTypes,
    _insertWasteType,
    _searchWasteTypeByName,
    _updateWasteTypeById,
    _deleteWasteTypeById
};