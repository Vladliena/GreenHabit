const express = require("express");
const { showUsersGarbageTypes, showUserGarbageTypesById } = require("../controllers/usergarbagetype.controller");
const ug_router = express.Router();
ug_router.get("/", showUsersGarbageTypes);
ug_router.get("/:id", showUserGarbageTypesById);

module.exports = { ug_router };