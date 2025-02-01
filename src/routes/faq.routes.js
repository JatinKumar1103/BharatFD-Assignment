import {Router} from 'express';
import { createFaq, deleteFaq, getFaq, updateFaq } from '../controllers/faq.controller.js';

const router = Router();

router.route("/create").post(createFaq);
router.route("/update/:id").post(updateFaq);
router.route("/delete/:id").delete(deleteFaq);
router.route("/").get(getFaq)

export default router;