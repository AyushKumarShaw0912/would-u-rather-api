import app from "./app.js"
import {connectDb} from "./config/db.js"


connectDb()

app.listen(process.env.PORT,()=>{
    console.log(`Server is working  on port ${process.env.PORT}`)
})