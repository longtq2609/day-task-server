const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")


dotenv.config();

//CONNECT DATABASE
mongoose.connect(process.env.MONGOODB_URL, {
    dbName: 'day-task'
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit on connection failure (optional)
    });


app.use(bodyParser.json({limit: "50mb"}));

app.use(cors());

app.use(morgan("common"));


//ROUTE

app.use("/api/user", userRoute);




app.listen(8000, () => {
    console.log("Server is running ...")
})

