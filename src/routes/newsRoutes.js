import express from 'express';
import { getTopHeadlines, searchNews } from'../controllers/newsController.js';

const router = express.Router();

router.get('/top-headlines', getTopHeadlines);
router.get('/search', searchNews);

export default router;