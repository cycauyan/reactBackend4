const express=require("express");
const mongoose= require("mongoose");
const cors =require("cors");

const userRoutes= require("./routes/userRoutes.js");


const app= express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/account",userRoutes);

const dbName = "test";
const dbUsername = "admin";
const dbPassword = "admin";
const dbConnection = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.fqfzwsl.mongodb.net/${dbName}?retryWrites=true&w=majority`
const port = 8080;

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