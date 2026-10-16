import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    urlToImage: { type: String },
    publishedAt: { type: String },
    source: {
      id: { type: String, default: null },
      name: { type: String }
    }
  },
  { timestamps: true }
);

// Prevent duplicate bookmarks for the same user
bookmarkSchema.index({ user: 1, url: 1 }, { unique: true });

export default mongoose.model('Bookmark', bookmarkSchema);