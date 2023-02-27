import express from "express";
import {
  addArtist,
  deleteArtist,
  getArtist,
  updateArtist,
  getAllArtists,
  getArtistsNames,
  getArtistTags,
} from "../../controllers/gallery/artist.js";

import {
  addArtwork,
  deleteArtwork,
  getArtwork,
  updateArtwork,
  getAllArtworks,
} from "../../controllers/gallery/artwork.js";

import { login, register, logout } from "../../controllers/gallery/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router.get("/artworks", getAllArtworks);
router.post("/artwork", addArtwork);
router.get("/artwork/:id", getArtwork);
router.delete("/artwork/:id", deleteArtwork);
router.put("/artwork/:id", updateArtwork);

// For choosing artists when adding the artwork
router.get("/artist", getArtistsNames);

router.get("/artistTags", getArtistTags);
router.get("/artists", getAllArtists);
router.post("/artist", addArtist);
router.get("/artist/:id", getArtist);
router.delete("/artist/:id", deleteArtist);
router.put("/artist/:id", updateArtist);

export default router;
