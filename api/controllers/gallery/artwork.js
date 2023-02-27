import {
  getAllArtworksData,
  addArtworkData,
  getArtworkData,
  updateArtworkData,
  deleteArtworkData,
} from "../../data/artwork.js";

import { getTagsData, updateTagsData } from "../../data/tag.js";

const addArtwork = async (req, res) => {
  console.log("addArtwork by " + req.session.galleryUserId);
  const title = req.body.title;
  const artist = req.body.artist;
  const place = req.body.place;
  const intro = req.body.intro;
  const tags = req.body.tags;
  const img = req.body.img;
  const other = req.body.other;
  const time = req.body.time;

  // Authentication
  if (!req.session.galleryUserId) {
    console.log("Not authenticated!");
    return res.status(400).json("Not authenticated!");
  }

  try {
    await updateTagsData("artwork", tags);
    await addArtworkData(
      req.session.galleryUserId,
      title,
      artist.value,
      place,
      intro,
      tags,
      img,
      other,
      time
    );
    console.log("addArtwork finished");
    return res.json("Artwork has been created.");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getAllArtworks = async (req, res) => {
  console.log("getAllArtworks by " + req.session.galleryUserId);
  const tag = req.query.tag;
  try {
    const allArtworks = await getAllArtworksData(tag);
    console.log("getAllArtworks finished");
    res.status(200).json(allArtworks);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getArtwork = async (req, res) => {
  console.log("getArtwork by " + req.session.galleryUserId);
  try {
    const getArtwork = await getArtworkData(req.params.id);
    console.log("getAllArtworks finished");
    res.status(200).json(getArtwork);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateArtwork = async (req, res) => {
  console.log("updateArtwork by " + req.session.galleryUserId);
  const artworkId = req.params.id;
  const title = req.body.title;
  const artistId = req.body.artist.value;
  const place = req.body.place;
  const intro = req.body.intro;
  const tags = req.body.tags;
  const img = req.body.img;
  const time = req.body.time;
  const other = req.body.other;

  // Authentication
  if (!req.session.galleryUserId) {
    console.log("Not authenticated!");
    return res.status(400).json("Not authenticated!");
  }

  try {
    await updateTagsData("artwork", tags);
    await updateArtworkData(
      req.session.galleryUserId,
      artworkId,
      title,
      artistId,
      place,
      intro,
      tags,
      img,
      time,
      other
    );
    console.log("updateArtwork finished");
    return res.json("Artwork has been updated.");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const deleteArtwork = async (req, res) => {
  console.log("deleteArtwork by " + req.session.galleryUserId);
  // Authentication
  if (!req.session.galleryUserId) {
    console.log("Not authenticated!");
    return res.status(400).json("Not authenticated!");
  }
  try {
    await deleteArtworkData(req.session.galleryUserId, req.params.id);
    console.log("deleteArtwork finished");
    return res.json("Artwork has been deleted.");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export { addArtwork, deleteArtwork, getArtwork, updateArtwork, getAllArtworks };
