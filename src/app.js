const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { format } = require("timeago.js")

//config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/upload/img"));
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

//import routers
const indexRouter = require("./routes/indexRouter");
//connect mongodb
require("./database");

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleware
app.use(
  multer({
    storage,
  }).single("image")
);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next)=>{
     app.locals.timeFormat = format
     next()
})
//file static
app.use(express.static('src/public'))
app.use('/css', express.static('public/css'))
//routers
app.use(indexRouter);



//listen
app.listen(app.get("port"), () => {
  console.log("server on port ", app.get("port"));
});
