const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const http = require("http");
const userRoutes = require("./routes/userRoutes")
const enquiryRoutes = require("./routes/enquiryRoutes")
const notificationRoutes = require("./routes/notificationRoute")
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;


// Setting up cross origin access
const allowedOrigins = [
    "http://localhost:3000",
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  };
  
  app.use(cors(corsOptions));

// DB Connection
require("./config/db").connectDatabase();

// Logger Setup
const logger = require("morgan");
app.use(logger("tiny"));

// Activating Body-Parser and cookie parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initializing session
app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SECRET,
    })
  );

// Routes

app.use('/api/users', userRoutes)
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/notifications', notificationRoutes)

app.get('/', (req, res) => {
    res.send('Server started successfully');
  });

// Error Handling
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./Middlewares/errors");

app.use("*", (req, res, next) => {
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
  });
app.use(generatedErrors);


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));