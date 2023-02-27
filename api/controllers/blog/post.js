import mongoCollections from "../../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import fs from "fs";
import path from "path";
const posts = mongoCollections.posts;
const users = mongoCollections.blogUsers;

const getUserById = async (userId) => {
  const userCollection = await users();
  const getUser = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (getPost === null)
    throw `Error: Post with id of ${getUser._id.toString()} not found`;

  getUser._id = getUser._id.toString();
  return getUser;
};

const getAllPosts = async (cat) => {
  // call Collection find all API
  const postCollection = await posts();
  let postList;

  // traverse posts and extract ids and titles into list
  let output = [];
  if (typeof cat != "undefined") {
    postList = await postCollection.find({ cat: cat }).toArray();
    if (!postList) throw "Error: Getting all posts failed";
  } else {
    postList = await postCollection.find({}).toArray();
  }
  for (const post of postList) {
    let postObj = {
      id: post["_id"].toString(),
      title: post["title"],
      desc: post["desc"],
      img: post["img"],
    };
    output.push(postObj);
  }
  return output;
};

const getPostById = async (postId) => {
  // call Collection find API
  const postCollection = await posts();
  const getPost = await postCollection.findOne({ _id: new ObjectId(postId) });
  if (getPost === null) throw `Error: Post with id of ${postId} not found`;

  const getUser = await getUserById(getPost.authId.toString());
  const output = {
    postId: getPost["_id"].toString(),
    userId: getPost.authId.toString(),
    username: getUser.username,
    userImg: getUser.img,
    title: getPost.title,
    desc: getPost.desc,
    postImg: getPost.img,
    cat: getPost.cat,
    date: getPost.date,
  };
  return output;
};

const deletePostById = async (postId, userId) => {
  const getPost = await getPostById(postId);
  if (getPost.userId != userId) {
    throw "Error: Can't delete other's post! ";
  }

  const oldPhoto = getPost.postImg;
  const targetPath = "../client/public/upload/blog/" + oldPhoto;
  fs.unlink(targetPath, () => {});

  const postCollection = await posts();
  const deletionInfo = await postCollection.deleteOne({
    _id: new ObjectId(postId),
  });
  if (deletionInfo.deletedCount === 0) {
    throw `Error: Deleting post with id of ${postId} failed`;
  }

  return true;
};

const createPost = async (title, desc, img, cat, date, userId) => {
  // create new Object
  let newPost = {
    title: title,
    desc: desc,
    img: img,
    cat: cat,
    date: date,
    authId: new ObjectId(userId),
  };

  // call Collection insert API
  const postCollection = await posts();
  const insertInfo = await postCollection.insertOne(newPost);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Error: Creating post failed";

  // get post created
  const newId = insertInfo.insertedId.toString();
  const post = await getPostById(newId);

  return post;
};

const updatePostById = async (authId, postId, title, desc, img, cat) => {
  const getPost = await getPostById(postId);
  if (getPost.userId != authId) {
    throw "Error: Can't delete other's post! ";
  }

  const oldPhoto = getPost.postImg;
  const targetPath = "../client/public/upload/" + oldPhoto;
  fs.unlink(targetPath, () => {});

  let updatedPost = {
    title: title,
    desc: desc,
    img: img,
    cat: cat,
    date: getPost.date,
    authId: new ObjectId(getPost.userId),
  };

  // call Collection insert API
  const postCollection = await posts();
  const updatedInfo = await postCollection.updateOne(
    { _id: new ObjectId(postId) },
    { $set: updatedPost }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Error: Updating post failed";
  }

  return updatedPost;
};

export const getPosts = async (req, res) => {
  const cat = req.query.cat;
  try {
    const allPosts = await getAllPosts(cat);
    res.status(200).json(allPosts);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
};

export const addPost = (req, res) => {
  console.log(req.session.blogUserId);
  if (!req.session.blogUserId) {
    return res.status(400).json("Not authenticated!");
  }

  const title = req.body.title;
  const desc = req.body.desc;
  const img = req.body.img;
  const cat = req.body.cat;
  const date = req.body.date;
  const blogUserId = req.session.blogUserId;

  try {
    createPost(title, desc, img, cat, date, blogUserId);
    return res.json("Post has been created.");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const deletePost = (req, res) => {
  if (!req.session.blogUserId) {
    return res.status(400).json("Error: Not authenticated!");
  }
  try {
    const deleteInfo = deletePostById(req.params.id, req.session.blogUserId);
    if (deleteInfo) {
      return res.json("Post has been deleted!");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updatePost = (req, res) => {
  if (!req.session.blogUserId) {
    return res.status(400).json("Error: Not authenticated!");
  }
  const title = req.body.title;
  const desc = req.body.desc;
  const img = req.body.img;
  const cat = req.body.cat;
  const postId = req.params.id;

  try {
    updatePostById(req.session.blogUserId, postId, title, desc, img, cat);
    return res.json("Post has been updated!");
  } catch (error) {
    return res.status(400).json(error);
  }
};
