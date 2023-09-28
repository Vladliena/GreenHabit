const express = require("express");
const { showAllUserResults, insertUserResult,searchUserResult } = require("../controllers/userresult.controller");
const ur_router = express.Router();


ur_router.get("/", showAllUserResults);
ur_router.post("/", insertUserResult)
ur_router.get("/:id", searchUserResult);


module.exports = { ur_router };