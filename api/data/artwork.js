import mongoCollections from "../config/mongoCollections.js";
const artists = mongoCollections.artists;
const artworks = mongoCollections.artworks;
import { ObjectId } from "mongodb";
import { updateTagsData } from "./tag.js";
import { getArtistData, getArtistsNamesData } from "./artist.js";
import fs from "fs";

const getArtworkData = async (id) => {
  const artworkCollection = await artworks();
  const artistCollection = await artists();

  const getArtwork = await artworkCollection.findOne({ _id: new ObjectId(id) });
  if (getArtwork === null) throw `Error: Artwork with id of ${id} not found`;

  const getArtist = await artistCollection.findOne({
    _id: getArtwork.artistId,
  });
  if (getArtist === null) throw `Error: Artist with id of ${id} not found`;
  const output = {
    title: getArtwork.title,
    artistId: getArtist._id.toString(),
    artistName: getArtist.name,
    artist: { value: getArtist._id.toString(), label: getArtist.name },
    place: getArtwork.place,
    intro: getArtwork.intro,
    tags: getArtwork.tags,
    img: getArtwork.img,
    other: getArtwork.other,
    time: getArtwork.time,
    artworkPosterId: getArtwork.artworkPosterId.toString(),
    artistPosterId: getArtwork.artistPosterId.toString(),
  };

  const NamesGenres = await getArtistsNamesData();

  output.artistOptions = NamesGenres.artistsArray;
  output.artworkOptions = NamesGenres.tagsArray;

  return output;
};

const addArtworkData = async (
  artworkPosterId,
  title,
  artistId,
  place,
  intro,
  tags,
  img,
  other,
  time
) => {
  const getArtist = await getArtistData(artistId);

  let processedTags = [];
  for (const tag of tags) {
    let temp = {
      value: tag.value,
      label: tag.label,
    };
    processedTags.push(temp);
  }

  let newArtwork = {
    artistPosterId: new ObjectId(getArtist.artistPosterId),
    artworkPosterId: new ObjectId(artworkPosterId),
    title: title,
    artistId: new ObjectId(artistId),
    place: place,
    intro: intro,
    tags: processedTags,
    img: img,
    other: other,
    time: time,
  };

  const artworkCollection = await artworks();
  const insertInfo = await artworkCollection.insertOne(newArtwork);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Error: Creating artwork failed";

  // get artist created
  const newId = insertInfo.insertedId.toString();
  const artwork = await getArtworkData(newId);

  return artwork;
};

const getAllArtworksData = async (inputTags) => {
  let artworkList;
  let output = [];

  const artworkCollection = await artworks();

  if (typeof inputTags === "undefined" || inputTags === null) {
    artworkList = await artworkCollection.find({}).toArray();
  } else {
    artworkList = await artworkCollection
      .find({ tags: { $in: inputTags } })
      .toArray();
  }
  if (!artworkList) throw "Error: Getting all artworks failed";

  for (const artwork of artworkList) {
    const artworkObject = {
      id: artwork["_id"].toString(),
      name: artwork["name"],
      img: artwork["img"],
      type: "artworks",
    };
    output.push(artworkObject);
  }

  return output;
};

const updateArtworkData = async (
  userId,
  artworkId,
  title,
  artistId,
  place,
  intro,
  tags,
  img,
  time,
  other
) => {
  const getArtwork = await getArtworkData(artworkId);

  // Only the poster of this artwork or poster of the artist have the access
  if (
    userId !== getArtwork.artistPosterId &&
    userId !== getArtwork.artworkPosterId
  ) {
    throw "Not authenticated!";
  }
  let processedTags = [];
  for (const tag of tags) {
    let temp = {
      value: tag.value,
      label: tag.label,
    };
    processedTags.push(temp);
  }

  if (getArtwork.img != img) {
    const oldPhoto = getArtwork.img;
    const targetPath = "../../client/public/upload/gallery/" + oldPhoto;
    fs.unlink(targetPath, () => {});
  }

  let updatedArtwork = {
    artistPosterId: new ObjectId(getArtwork.artistPosterId),
    artworkPosterId: new ObjectId(getArtwork.artworkPosterId),
    _id: new ObjectId(artworkId),
    title: title,
    artistId: new ObjectId(artistId),
    place: place,
    intro: intro,
    tags: processedTags,
    img: img,
    other: other,
    time: time,
  };

  const artworkCollection = await artworks();
  const updatedInfo = await artworkCollection.updateOne(
    { _id: new ObjectId(artworkId) },
    { $set: updatedArtwork }
  );

  return await getArtworkData(artworkId);
};

const deleteArtworkData = async (userId, artworkId) => {
  const getArtwork = await getArtworkData(artworkId);

  // Only the poster of this artwork or poster of the artist have the access
  if (
    userId !== getArtwork.artistPosterId &&
    userId !== getArtwork.artworkPosterId
  ) {
    throw "Not authenticated!";
  }

  const artworkCollection = await artworks();

  let targetPath = "../client/public/upload/gallery/" + getArtwork.img;
  fs.unlink(targetPath, () => {});

  let deletionInfo = await artworkCollection.deleteOne({
    _id: new ObjectId(artworkId),
  });
  if (deletionInfo.deletedCount === 0) {
    throw `Error: Deleting artwork with id of ${artworkId} failed`;
  }
};

export {
  getArtworkData,
  getAllArtworksData,
  deleteArtworkData,
  updateArtworkData,
  addArtworkData,
};
