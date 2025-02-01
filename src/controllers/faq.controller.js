import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Faq} from "../models/faq.model.js";


const createFaq = asyncHandler(async(req,res)=>{
    const {question, answer, translations} = req.body;

    const newFaq = new Faq({
        question,
        answer,
        translations
    });
    await newFaq.save();
    res.status(201)
    .json(new ApiResponse(
        201,
        newFaq,
        "FAQ created successfully"
    ))
});

export{
    createFaq
}