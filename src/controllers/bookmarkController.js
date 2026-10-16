import Bookmark from'../models/Bookmark.js';
import asyncHandler from'../utils/asyncHandler.js';

// @desc    Save an article to bookmarks
// @route   POST /api/v1/bookmarks
export const addBookmark = asyncHandler(async (req, res) => {
  const { title, description, url, urlToImage, publishedAt, source } = req.body;

  const existingBookmark = await Bookmark.findOne({ user: req.user._id, url });
  if (existingBookmark) {
    return res.status(400).json({ success: false, message: 'Article already bookmarked' });
  }

  const bookmark = await Bookmark.create({
    user: req.user._id,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    source
  });

  res.status(201).json({ success: true, data: bookmark });
});

// @desc    Get all bookmarked articles for current user
// @route   GET /api/v1/bookmarks
export const getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ user: req.user._id }).sort('-createdAt');
  res.json({ success: true, count: bookmarks.length, data: bookmarks });
});

// @desc    Delete a bookmarked article
// @route   DELETE /api/v1/bookmarks/:id
export const deleteBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findById(req.params.id);

  if (!bookmark) {
    return res.status(404).json({ success: false, message: 'Bookmark not found' });
  }

  if (bookmark.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this bookmark' });
  }

  await bookmark.deleteOne();
  res.json({ success: true, message: 'Bookmark removed successfully' });
});