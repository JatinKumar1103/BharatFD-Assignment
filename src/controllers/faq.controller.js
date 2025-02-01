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


const updateFaq = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const{ question,answer, translations} = req.body;
    const faq = await Faq.findById(id);
    if(!faq){
        throw new ApiError(404, "FAQ not found");
    }

    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;
    faq.translations = translations || faq.translations;

    await faq.save();
    res.status(200)
    .json(new ApiResponse(
        200,
        faq,
        "FAQ updated successfully"
    ))
})

const deleteFaq = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const faq = await Faq.findById(id);
    if(!faq){
        throw new ApiError(404, "FAQ not found");
    }
    await faq.deleteOne();
    res.status(200)
    .json(new ApiResponse(
        200,
        "FAQ deleted successfully"
    ))
})

export{
    createFaq,
    updateFaq,
    deleteFaq
}