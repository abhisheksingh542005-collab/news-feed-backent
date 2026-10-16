import axios from 'axios';
import asyncHandler from '../utils/asyncHandler.js';

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// 🔑 APNI ACTUAL NEWS API KEY YAHAN PASTE KAREIN (Quotes ke andar)
// Line 10 bada
// Line 10 badal kar:
const HARDCODED_NEWS_API_KEY = 'eaa8e4b2297142dfbb8d55aa30e0b7ad';

// @desc    Get top headlines (with category and query filters)
// @route   GET /api/v1/news/top-headlines
export const getTopHeadlines = asyncHandler(async (req, res) => {
  const { category = 'general', page = 1, pageSize = 10, country = 'us' } = req.query;

  const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
    params: {
      apiKey: HARDCODED_NEWS_API_KEY,
      category,
      country,
      page,
      pageSize
    }
  });

  res.json({
    success: true,
    totalResults: response.data.totalResults,
    articles: response.data.articles
  });
});

// @desc    Search news articles by keyword
// @route   GET /api/v1/news/search
export const searchNews = asyncHandler(async (req, res) => {
  const { q, sortBy = 'publishedAt', page = 1, pageSize = 10 } = req.query;

  if (!q) {
    return res.status(400).json({ success: false, message: 'Search query parameter (q) is required' });
  }

  const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
    params: {
      apiKey: HARDCODED_NEWS_API_KEY,
      q,
      sortBy,
      page,
      pageSize
    }
  });

  res.json({
    success: true,
    totalResults: response.data.totalResults,
    articles: response.data.articles
  });
});