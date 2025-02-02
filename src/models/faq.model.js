import mongoose, { Schema } from "mongoose";
import translate from "google-translate-api-x";

const faqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
      type: Map,
      of: {
        question: { type: String },
        answer: { type: String },
      },
      default: {},
    },
  },
  { timestamps: true }
);


faqSchema.methods.translateFaq = async function (lang) {
  if (this.translations.get(lang)) return this.translations.get(lang);

  const translatedQuestion = await translate(this.question, { to: lang }).then((res) => res.text);
  const translatedAnswer = await translate(this.answer, { to: lang }).then((res) => res.text);

  const translation = { question: translatedQuestion, answer: translatedAnswer };
  this.translations.set(lang, translation);
  await this.save();

  return translation;
};

export const Faq = mongoose.model("Faq", faqSchema);
