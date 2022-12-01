const session = require("express-session");
const Mongostore=require("connect-mongo")
const mongoose= require("mongoose")

module.exports = (app) => {
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none," : "lax",
        secure:process.env.NODE_ENV === "production",
        maxAge: 60000
      },
      rolling:true,
      store:Mongostore.create({            // storing in mongodb the session 
        mongoUrl:process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/project2" 
      })
    })
  );
};