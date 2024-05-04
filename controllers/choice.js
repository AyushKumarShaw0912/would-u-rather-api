import { catchAsyncHandler } from "../middlewares/catchAsynchandler.js"
import ErrorHandler from "../utils/errorHandler.js"
import {Choice} from "../models/choice.js"


export const newQuestion=catchAsyncHandler(async(req,res,next)=>{
    const {choice1,choice2}=req.body

    if(!choice1||!choice2){
        return next(new ErrorHandler("you must fill up fields",404))
    }
    await Choice.create({
        choice1,
        choice2
    })
    res.status(201).json({
        success:true,
        message:"New question added"
    })
})

export const fetchQuestion=catchAsyncHandler(async(req,res,next)=>{
   const randomQuestion=await Choice.aggregate([{$sample:{size:1}}])
   if(!randomQuestion){
    return next(new ErrorHandler("No question found",404))
   }
   res.status(200).json({
    success:true,
    message:"Question fetched",
    randomQuestion
})
})

export const updateQuestion=catchAsyncHandler(async(req,res,next)=>{
    let choice1percentage=0;
    let choice2percentage=0;
    const question=await Choice.findById(req.params.id);
    if(!question){
        return next(new ErrorHandler("Incorrect question id",404))
    }
    const selectedOption=req.query.selected;
    if(!selectedOption){
        return next(new ErrorHandler("No option selection",404))
    }
   
    if(question.choice1===selectedOption){
        question.totalResponses+=1;
        question.choice1percent+=1;
        // console.log(question.totalResponses)
        // console.log(question.choice1percent)
        question.save()
        choice1percentage=(question.choice1percent/question.totalResponses)*100
        choice2percentage=(question.choice2percent/question.totalResponses)*100
        res.status(200).json({
            success:true,
            message:"Successfully updated",
            choice1percentage,
            choice2percentage
        })
    }
    if(question.choice2===selectedOption){
        question.totalResponses+=1;
        question.choice2percent+=1;
        // console.log(question.totalResponses)
        // console.log(question.choice2percent)
        question.save()
        choice1percentage=(question.choice1percent/question.totalResponses)*100
        choice2percentage=(question.choice2percent/question.totalResponses)*100
        res.status(200).json({
            success:true,
            message:"Successfully updated",
            choice1percentage,
            choice2percentage
        })
    }
 
})