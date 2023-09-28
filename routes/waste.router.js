const express = require("express");
const { getAllWasteTypes, createWasteType, searchWasteType, updateWasteType, deleteWasteType } = require('../controllers/waste.controller');
// const { verifyToken } = require("../middlewares/varifyToken")

const w_router = express.Router();

w_router.get("/", getAllWasteTypes);

w_router.post("/", createWasteType);

w_router.get("/search", searchWasteType)

w_router.put("/:id", updateWasteType)

w_router.delete("/:id", deleteWasteType)


module.exports = { w_router };