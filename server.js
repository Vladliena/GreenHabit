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
const nodemailer = require("nodemailer");
const fs = require('fs')
const app = express();
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
    console.log(`You run on port ${process.env.PORT}`)
});

// App Main routes


app.use("/api/waste", w_router);
app.use("/api/users", u_router);
app.use("/api/uresults", ur_router);
app.use("/api/leaderboard", l_router);
app.use("/api/usergarbage", ug_router);



// Send Welcome Email to new User

app.post("/api/send-email", (req, res) => {
    const toEmail = req.body.to;
    const toUsername = req.body.username;

    console.log('heeey from email =>', toEmail)

    let emailTemplate = fs.readFileSync("welcome.html", "utf8");
    emailTemplate = emailTemplate.replace("{{toUsername}}", toUsername)

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", 
        port: 465, 
        secure: true, 
        auth: {
            user: process.env.APP_EMAIL, 
            pass: process.env.APP_PASS,

        },
    });

    let info = transporter.sendMail({
        from: `"Green Habit" <${process.env.APP_EMAIL}>`,
        to: toEmail,
        subject: "Welcome to Green Habit! ",
        html: emailTemplate,
    });

    info.then(() => {
        console.log("Email sent successfully");
        res.status(200).json({ message: "Email sent successfully" });
    }).catch((error) => {
        console.error("Email sending failed: ", error);
        res.status(500).json({ error: "Email sending failed" });
    });
});


// Upload Avatar to Cloudinary

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




// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});