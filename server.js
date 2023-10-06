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
const { addAvatar } = require("./controllers/user.controller.js")
const { cloudinary } = require('./utils/cloudinary.js')
const { verifyToken } = require("./middlewares/varifyToken.js")

const app = express();
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
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


// app.get ('/api/images', async (req, res)=> {
//     const {resources} = await cloudinary.search.expression
//     ('folder:dev_setups')
//     .sort_by('public_id', 'desc')
//     .max_results(30)
//     .execute();
//     const publicIds = resources.map(file => file.public_id);
//     res.send(publicIds);
// })
app.post('/api/upload', verifyToken, async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        await addAvatar(uploadResponse.url, req.user.username, res)
        console.log('avatar added')
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});