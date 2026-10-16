import express from'express';
import { addBookmark, getBookmarks, deleteBookmark } from '../controllers/bookmarkController.js';
import  protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All bookmark routes are protected

router.route('/')
  .post(addBookmark)
  .get(getBookmarks);

router.delete('/:id', deleteBookmark);

export default router;