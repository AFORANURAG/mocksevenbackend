const express = require("express");
const cors = require("cors")
const app = express();
const PORT = 8000;
const {AddRouter} = require("./controllers/addController")
const {connection} = require("./config/db.config");

app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.use("/add",AddRouter);


app.get("/",(req,res)=>{
    res.status(200).json({message:"ok"})
})

app.listen(PORT||8080,async ()=>{
    try {
        await connection;
        console.log("connected to db successfully");
        console.log(`listening on port ${PORT}`)
    } catch (error) {
        console.log(error);
    }
})

