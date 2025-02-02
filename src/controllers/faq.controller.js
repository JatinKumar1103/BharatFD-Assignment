import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Faq } from "../models/faq.model.js";
import redisClient from "../config/redisClient.config.js";
import translate from "google-translate-api-x";

const createFaq = asyncHandler(async (req, res) => {
    const { question, answer } = req.body;

    const translations = {
        hi: {
            question: (await translate(question, { to: "hi" })).text,
            answer: (await translate(answer, { to: "hi" })).text,
        },
        bn: {
            question: (await translate(question, { to: "bn" })).text,
            answer: (await translate(answer, { to: "bn" })).text,
        },
    };

    const newFaq = new Faq({ question, answer, translations });
    await newFaq.save();

    res.status(201).json(new ApiResponse(201, newFaq, "FAQ created successfully"));
});

const getFaq = asyncHandler(async (req, res) => {
    const { lang } = req.query;

    console.log("Requested language:", lang);

    const cachedFaqs = await redisClient.get(`faqs_${lang || "default"}`);
    if (cachedFaqs) {
        console.log("Serving from cache");
        return res.status(200).json(new ApiResponse(200, JSON.parse(cachedFaqs), "FAQs fetched from cache"));
    }

    const faqs = await Faq.find();
    console.log("Fetched from DB:", faqs);

    let responseData = faqs.map(faq => {
        const translation = lang ? faq.translations.get(lang) : null;


        return {
            question: translation?.question || faq.question,
            answer: translation?.answer || faq.answer
        };
    });

    await redisClient.setEx(`faqs_${lang || "default"}`, 3600, JSON.stringify(responseData));

    res.status(200).json(new ApiResponse(200, responseData, "FAQs fetched successfully"));
});


const updateFaq = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    const faq = await Faq.findById(id);
    if (!faq) throw new ApiError(404, "FAQ not found");

    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;

    await faq.save();

    // 🔹 Clear cache so next fetch gets updated data
    await redisClient.del(`faqs_default`);
    await redisClient.del(`faqs_hi`);
    await redisClient.del(`faqs_bn`);

    res.status(200).json(new ApiResponse(200, faq, "FAQ updated successfully"));
});

const deleteFaq = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const faq = await Faq.findById(id);
    if (!faq) throw new ApiError(404, "FAQ not found");

    await faq.deleteOne();

    await redisClient.del(`faqs_default`);
    await redisClient.del(`faqs_hi`);
    await redisClient.del(`faqs_bn`);

    res.status(200).json(new ApiResponse(200, "FAQ deleted successfully"));
});

export { createFaq, getFaq, updateFaq, deleteFaq };

