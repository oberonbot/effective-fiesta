import express from "express";
import {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
} from "../../controllers/blog/post.js";

import { login, register, logout } from "../../controllers/blog/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
