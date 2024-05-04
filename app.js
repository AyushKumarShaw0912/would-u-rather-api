import express,{urlencoded} from "express"
import cors from "cors"
import {config} from "dotenv"
import ErrorMiddleware from "./middlewares/error.js";


config({
    path: "./config/config.env",
  });
const app=express()



app.use(express.json())
app.use(cors())


import Routes from "./routes/choice.js"

app.use("/api/v1",Routes)
app.use("/",(req,res)=>{
  res.send("Api is working")
})

app.use(ErrorMiddleware)
export default app