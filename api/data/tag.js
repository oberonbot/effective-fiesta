import mongoCollections from "../config/mongoCollections.js";
const tags = mongoCollections.tags;

const updateTagsData = async (name, inputTags) => {
  const tagCollection = await tags();

  let getTags = await tagCollection.findOne({ name: name });
  // create new tagObj
  if (getTags === null) {
    let tagsArray = [];
    // This is to remove the __isNew__
    for (const tagObj of inputTags) {
      let temp = {
        label: tagObj.label,
        value: tagObj.value,
      };
      tagsArray.push(temp);
    }
    const newTags = {
      name: name,
      tags: tagsArray,
    };
    const insertInfo = await tagCollection.insertOne(newTags);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Error: Creating tags failed";
  } else {
    // add those tags with __isNew__

    let isThereNew = false;
    for (const tagObj of inputTags) {
      // find the tag with __isNew__
      if (
        (typeof tagObj.__isNew__ !== "undefined" ||
          tagObj.__isNew__ !== null) &&
        tagObj.__isNew__
      ) {
        isThereNew = true;
        let temp = {
          label: tagObj.label,
          value: tagObj.value,
        };
        getTags.tags.push(temp);
      }
    }

    if (isThereNew) {
      // now update the tags
      const updatedInfo = await tagCollection.updateOne(
        { name: name },
        { $set: getTags }
      );
      if (updatedInfo.modifiedCount === 0) {
        throw "Error: Updating tags failed";
      }
    }
  }

  // get tags created
  const returnTags = await getTagsData(name);
  return returnTags;
};

const getTagsData = async (name) => {
  const tagCollection = await tags();
  const tagsObj = await tagCollection.findOne({ name: name });
  if (!tagsObj) {
    return [];
  }
  let tagsArray = tagsObj.tags;
  tagsArray.sort((a, b) => a.value.localeCompare(b.value));
  return tagsArray;
};

export { updateTagsData, getTagsData };
