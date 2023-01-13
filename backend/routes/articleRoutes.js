import express from "express";
const router = express.Router();
import {
  getArticles,
  getArticleById,
  deleteArticle,
  createArticle,
  updateArticle,
} from "../controllers/articleController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getArticles).post(protect, admin, createArticle);

router
  .route("/:id")
  .get(getArticleById)
  .delete(protect, admin, deleteArticle)
  .put(protect, admin, updateArticle);

export default router;
