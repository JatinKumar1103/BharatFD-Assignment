import {Router} from 'express';
import { createFaq } from '../controllers/faq.controller.js';

const router = Router();

router.route("/create").post(createFaq);

export default router;