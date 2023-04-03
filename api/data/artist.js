import mongoCollections from "../config/mongoCollections.js";
const artists = mongoCollections.artists;
const artworks = mongoCollections.artworks;
const albums = mongoCollections.albums;
import { getTagsData } from "./tag.js";
import { ObjectId } from "mongodb";
import fs from "fs";

const addArtistData = async (
  artistPosterId,
  name,
  birth,
  passing,
  nation,
  intro,
  tags,
  img
) => {
  // create new artist
  let processedTags = [];
  for (const tag of tags) {
    let temp = {
      value: tag.value,
      label: tag.label,
    };
    processedTags.push(temp);
  }
  let newArtist = {
    artistPosterId: new ObjectId(artistPosterId),
    name: name,
    birth: birth,
    passing: passing,
    nation: nation,
    intro: intro,
    tags: processedTags,
    img: img,
  };

  // call artistCollection insert API
  const artistCollection = await artists();
  const insertInfo = await artistCollection.insertOne(newArtist);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Error: Creating artist failed";

  // get artist created
  const newId = insertInfo.insertedId.toString();
  const artist = await getArtistData(newId);

  return artist;
};

const getAllArtistsData = async (inputTags) => {
  let artistList;
  let output = [];

  const artistCollection = await artists();

  if (typeof inputTags === "undefined" || inputTags === null) {
    artistList = await artistCollection.find({}).toArray();
  } else {
    artistList = await artistCollection
      .find({ tags: { $in: inputTags } })
      .toArray();
  }
  if (!artistList) throw "Error: Getting all artists failed";

  for (const artist of artistList) {
    const artistObject = {
      id: artist["_id"].toString(),
      name: artist["name"],
      img: artist["img"],
      type: "artists", // so that when clicked, front end knows its type, using diff routes
    };
    output.push(artistObject);
  }

  return output;
};

const getArtistData = async (id) => {
  const artistCollection = await artists();
  const artworkCollection = await artworks();
  const albumCollection = await albums();

  const getArtist = await artistCollection.findOne({ _id: new ObjectId(id) });
  if (getArtist === null) throw `Error: Artist with id of ${id} not found`;

  const getArtworks = await artworkCollection
    .find({ artistId: getArtist._id })
    .toArray();

  const getAlbums = await albumCollection
    .find({ artistId: getArtist._id })
    .toArray();

  let artworkList = [];
  for (const artwork of getArtworks) {
    const artworkObject = {
      id: artwork._id.toString(),
      artworkPosterId: artwork.artworkPosterId.toString(),
      artistPosterId: artwork.artistPosterId.toString(),
      name: artwork.title,
      img: artwork.img,
      type: "artworks",
    };
    artworkList.push(artworkObject);
  }

  getArtist._id = getArtist._id.toString();
  getArtist.artistPosterId = getArtist.artistPosterId.toString();
  getArtist.artworks = artworkList;
  getArtist.albums = getAlbums;
  getArtist.artistTags = await getTagsData("artist");

  return getArtist;
};

// This is for choosing names in the select bar when adding artwork
// and artwork genres
const getArtistsNamesData = async () => {
  let artistList;
  let artistsArray = [];

  const artistCollection = await artists();
  artistList = await artistCollection.find({}).toArray();
  if (!artistList) throw "Error: Getting all artists failed";

  for (const artist of artistList) {
    const artistObject = {
      value: artist["_id"].toString(),
      label: artist["name"],
    };
    artistsArray.push(artistObject);
  }
  artistsArray.sort((a, b) => a.label.localeCompare(b.label));
  const tagsArray = await getTagsData("artwork");

  let output = {
    artistsArray: artistsArray,
    tagsArray: tagsArray,
  };

  return output;
};

const updateArtistData = async (
  artistId,
  name,
  birth,
  passing,
  nation,
  intro,
  tags,
  img
) => {
  let processedTags = [];
  for (const tag of tags) {
    let temp = {
      value: tag.value,
      label: tag.label,
    };
    processedTags.push(temp);
  }

  const getArtist = await getArtistData(artistId);

  if (getArtist.img != img) {
    const oldPhoto = getArtist.img;
    const targetPath = "../client/public/upload/gallery/" + oldPhoto;
    fs.unlink(targetPath, () => {});
  }

  // console.log(artistId);
  // console.log(getArtist.artistPosterId);
  let updatedArtist = {
    _id: new ObjectId(artistId),
    artistPosterId: new ObjectId(getArtist.artistPosterId),
    name: name,
    birth: birth,
    passing: passing,
    nation: nation,
    intro: intro,
    tags: processedTags,
    img: img,
  };

  // call artistCollection update API
  const artistCollection = await artists();
  const updatedInfo = await artistCollection.updateOne(
    { _id: new ObjectId(artistId) },
    { $set: updatedArtist }
  );

  return await getArtistData(artistId);
};

const deleteArtistData = async (userId, artistId) => {
  const getArtist = await getArtistData(artistId);

  if (userId !== getArtist.artistPosterId) {
    throw "Not authenticated!";
  }

  const getArtworks = getArtist.artworks;
  const artistCollection = await artists();
  const artworkCollection = await artworks();
  for (const artwork of getArtworks) {
    let targetPath = "../client/public/upload/gallery/" + artwork.img;
    fs.unlink(targetPath, () => {});

    let deletionInfo = await artworkCollection.deleteOne({
      _id: new ObjectId(artwork.id),
    });
    if (deletionInfo.deletedCount === 0) {
      throw `Error: Deleting artwork with id of ${artwork.id} failed`;
    }
  }

  let targetPath = "../../client/public/upload/gallery/" + getArtist.img;
  fs.unlink(targetPath, () => {});

  let deletionInfo = await artistCollection.deleteOne({
    _id: new ObjectId(artistId),
  });
  if (deletionInfo.deletedCount === 0) {
    throw `Error: Deleting artist with id of ${artistId} failed`;
  }
};

export {
  addArtistData,
  getArtistData,
  getAllArtistsData,
  deleteArtistData,
  updateArtistData,
  getArtistsNamesData,
};
