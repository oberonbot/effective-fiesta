import {
  addArtistData,
  getAllArtistsData,
  getArtistData,
  getArtistsNamesData,
  updateArtistData,
  deleteArtistData,
} from "../../data/artist.js";

import { getTagsData, updateTagsData } from "../../data/tag.js";

const addArtist = async (req, res) => {
  const name = req.body.name;
  const birth = req.body.birth;
  const nation = req.body.nation;
  const intro = req.body.intro;
  const tags = req.body.tags;
  const img = req.body.img;

  console.log("addArtist by " + req.session.galleryUserId);
  // Authentication
  if (!req.session.galleryUserId) {
    return res.status(400).json("Not authenticated!");
  }

  try {
    await updateTagsData("artist", tags);
    await addArtistData(
      req.session.galleryUserId,
      name,
      birth,
      nation,
      intro,
      tags,
      img
    );

    console.log("addArtist finished");
    return res.json("Artist has been created.");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getAllArtists = async (req, res) => {
  console.log("gettingAllArtists");
  const tag = req.query.tag;
  try {
    const allArtists = await getAllArtistsData(tag);
    res.status(200).json(allArtists);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getArtist = async (req, res) => {
  console.log("getArtist by " + req.session.galleryUserId);
  try {
    const getArtist = await getArtistData(req.params.id);
    console.log("getAllArtists finished");
    res.status(200).json(getArtist);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getArtistsNames = async (req, res) => {
  try {
    const getNames = await getArtistsNamesData();
    res.status(200).json(getNames);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getArtistTags = async (req, res) => {
  try {
    const getTags = await getTagsData("artist");
    res.status(200).json(getTags);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateArtist = async (req, res) => {
  console.log("updateArtist by " + req.session.galleryUserId);
  const name = req.body.name;
  const birth = req.body.birth;
  const nation = req.body.nation;
  const intro = req.body.intro;
  const tags = req.body.tags;
  const img = req.body.img;
  const artistPosterId = req.body.artistPosterId;
  const id = req.params.id;

  // Authentication
  if (
    !req.session.galleryUserId ||
    req.session.galleryUserId != artistPosterId
  ) {
    console.log("Not authenticated!");
    return res.status(400).json("Not authenticated!");
  }

  try {
    await updateTagsData("artist", tags);
    await updateArtistData(id, name, birth, nation, intro, tags, img);

    console.log("updateArtist finished");
    return res.json("Artist has been updated.");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const deleteArtist = async (req, res) => {
  console.log("deleteArtist by " + req.session.galleryUserId);
  // Authentication
  if (!req.session.galleryUserId) {
    return res.status(400).json("Not authenticated!");
  }

  try {
    await deleteArtistData(req.session.galleryUserId, req.params.id);
    console.log("deleteArtist finished");
    return res.json("Artist has been deleted.");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export {
  addArtist,
  deleteArtist,
  getArtist,
  updateArtist,
  getAllArtists,
  getArtistsNames,
  getArtistTags,
};
