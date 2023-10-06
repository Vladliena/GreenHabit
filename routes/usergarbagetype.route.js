const express = require("express");
const { showUsersGarbageTypes, showUserGarbageTypesById, addUserGarbageType, showFriendData } = require("../controllers/usergarbagetype.controller");
const ug_router = express.Router();
ug_router.get("/", showUsersGarbageTypes);
ug_router.get("/:id", showUserGarbageTypesById);
ug_router.get("/search/:name", showFriendData);
ug_router.post("/dump", addUserGarbageType)

module.exports = { ug_router };