import express from 'express';
import{ registerUser, loginUser, updatePreferences } from'../controllers/authController.js';
import  protect from'../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/preferences', protect, updatePreferences);

export default router;