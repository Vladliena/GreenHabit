const { db } = require("../config/db.js");

const _getAllWasteTypes = () => {
    return db("garbage_type").select("garbage_id", "title", "recycled", "s_size", "m_size", "l_size", "image_url", "type", "base_unit").orderBy("type")
};

const _insertWasteType = ({ title, recycled, s_size, m_size, l_size, image_url, type, base_unit }) => {
    return db("garbage_type").insert({ title, recycled, s_size, m_size, l_size, image_url, type, base_unit }, ["garbage_id", "title", "recycled", "s_size", "m_size", "l_size", "image_url", "type", "base_unit"])
};

const _searchWasteTypeByName = (type) => {
    return db.select("garbage_id", "title", "recycled", "s_size", "m_size", "l_size", "image_url", "type", "base_unit").from('garbage_type')
        .where({ type })
};

const _updateWasteTypeById = ({ title, recycled, s_size, m_size, l_size, image_url, type, base_unit }, id) => {
    return db("garbage_type")
        .update({ title, recycled, s_size, m_size, l_size, image_url, type, base_unit })
        .where({ garbage_id: id })
        .returning(["title", "recycled", "s_size", "m_size", "l_size", "image_url", "type", "base_unit"])
};

const _deleteWasteTypeById = (id) => {
    return db("garbage_type").where({ garbage_id: id }).del().returning(["garbage_id", "title", "recycled", "s_size", "m_size", "l_size", "image_url", "type", "base_unit"])
};

module.exports = {
    _getAllWasteTypes,
    _insertWasteType,
    _searchWasteTypeByName,
    _updateWasteTypeById,
    _deleteWasteTypeById
};