import {Router} from 'express';
import { createFaq, updateFaq } from '../controllers/faq.controller.js';

const router = Router();

router.route("/create").post(createFaq);
router.route("/update/:id").post(updateFaq)

export default router;