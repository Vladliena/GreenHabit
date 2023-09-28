const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const { w_router } = require("./routes/waste.router.js");
const { u_router } = require("./routes/user.route.js");
const { ur_router } = require("./routes/userresult.route.js");
const { l_router } = require("./routes/leaderboard.route.js");
const { ug_router } = require("./routes/usergarbagetype.route");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
    console.log(`You run on port ${process.env.PORT}`)
});

app.use("/api/waste", w_router);
app.use("/api/users", u_router);
app.use("/api/uresults", ur_router);
app.use("/api/leaderboard", l_router);
app.use("/api/usergarbage", ug_router);