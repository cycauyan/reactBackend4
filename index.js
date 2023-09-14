require('dotenv').config();
const express=require("express");
const mongoose= require("mongoose");
const cors =require("cors");

const userRoutes= require("./routes/userRoutes.js");
const businessUnitRoutes = require("./routes/businessUnitRoutes");
const skillRoutes = require("./routes/skillRoutes.js");

const app= express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//add routes here
app.use("/account",userRoutes);
app.use("/bu",businessUnitRoutes);
app.use("/skill",skillRoutes);

const dbConnection = process.env.localURI;
const port = 4040;

mongoose.set("strictQuery", true);
mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("error",
    console.error.bind(console, `Connection Error`)
);
mongoose.connection.once("open", () =>
    console.log(`Successfully connected to MongoDB Atlas`)
);

app.listen(process.env.PORT || port, () => {
    console.log(`API is now online on port ${process.env.PORT || port}`);
});