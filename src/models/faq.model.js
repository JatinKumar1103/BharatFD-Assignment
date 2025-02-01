import mongoose, { Schema } from "mongoose";

const faqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    translations: {
      type: Map,
      of: {
        question: { type: String, required: false },
        answer: { type: String, required: false },
      },
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const Faq = mongoose.model("Faq", faqSchema);
