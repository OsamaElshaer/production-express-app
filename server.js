// create express app
const express = require("express");
const app = express();

// require npm packages
const cors = require("cors");
const ESAPI = require("node-esapi");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const csrf = require("csurf");
const hpp = require("hpp");
const getRawBody = require("raw-body");
const cookieParser = require("cookie-parser");

//node core modules
const path = require("path");
//require from module

// config env & variables
require("dotenv").config();

const port = process.env.PORT;

//----------------------Middlewares---------------\\

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//protect against HTTP Parameter Pollution attacks
app.use(hpp());

// limit the size request
app.use(function (req, res, next) {
  getRawBody(req)
    .then(function (buf) {
      res.statusCode = 200;
      if (buf.length > 1e6) {
        return res.status(422).end(buf.length + " bytes submitted");
      }
      next();
    })
    .catch(function (err) {
      res.status(500).end(err.message);
    });
});

//limit requests rate
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after an 15 min",
});
app.use(limiter);

//helmet
app.use(helmet());

// CORS
let whiteList = process.env.WHITE_LIST;
let corsOptions = { origin: whiteList };
app.use(cors(corsOptions));

//Escape html
app.use(ESAPI.middleware());

//csrf
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// listening on port
app.listen(port, () => {
  console.log("server are listen on port 3000");
});
