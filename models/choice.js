import mongoose from "mongoose";


const choiceSchema=new mongoose.Schema({
    choice1:{
        type:String,
        required:[true,"Choice 1  cannot be empty"],
    },
    choice1percent:{
        type:Number,
        default:0
    },
    choice2:{
        type:String,
        required:[true,"Choice 2  cannot be empty"],
    },
    choice2percent:{
        type:Number,
        default:0
    },
    totalResponses:{
        type:Number,
        default:0
    }
},{
    timestamps:true,
}
)
export const Choice=mongoose.model("Choice",choiceSchema)