import asyncHandler from "express-async-handler";
import Article from "../models/articleModel.js";

// @desc    Fetch all articles
// @route   GET /api/articles
// @access  Public
const getArticles = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Article.countDocuments({ ...keyword });
  const articles = await Article.find({
    $or: [{ ...keyword }, { ...brandKeyword }, { ...categoryKeyword }],
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort([["createdAt", -1]]);

  res.json({ articles, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (product) {
    res.json(article);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    await article.remove();
    res.json({ message: "Article Deleted" });
  } else {
    res.status(404);
    throw new Error("Article not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createArticle = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Title Name",
    user: req.user._id,
    image: "https://i.ibb.co/5cwCHky/FY3017-2.jpg",
    author: "Creative Duo LLC",
    category: "Handmade",
    description: "Sample description",
    content: "Sample content",
  });

  const createdArticle = await article.save();
  res.status(201).json(createdArticle);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateArticle = asyncHandler(async (req, res) => {
  const { name, image, author, category, description, content } = req.body;

  const article = await Article.findById(req.params.id);

  if (article) {
    article.name = name;
    article.description = description;
    article.image = image;
    article.category = category;
    article.author = author;
    article.content = content;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } else {
    res.status(404);
    throw new Error("Article not found");
  }
});

export {
  getArticles,
  getArticleById,
  deleteArticle,
  createArticle,
  updateArticle,
};
