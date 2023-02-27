import mongoCollections from "../../config/mongoCollections.js";
const blogUsers = mongoCollections.blogUsers;
import bcrypt from "bcryptjs";
const saltRounds = 16;

const checkUser = async (username, password) => {
  const userCollection = await blogUsers();
  const getUser = await userCollection.findOne({ username: username });

  if (getUser === null) {
    throw "Error: Either username or password is invalid";
  }
  const comparePassword = await bcrypt.compare(
    password,
    getUser.hashedPassword
  );

  if (comparePassword) {
    return {
      id: getUser._id.toString(),
      username: getUser.username,
      email: getUser.email,
      img: getUser.img,
    };
  } else {
    throw "Error: Either username or password is invalid";
  }
};

const createUser = async (email, username, password) => {
  const userCollection = await blogUsers();
  const getUserWithEmail = await userCollection.findOne({ email: email });
  const getUserWithUsername = await userCollection.findOne({
    username: username,
  });
  if (getUserWithEmail || getUserWithUsername) {
    throw `Error: User already existed`;
  }
  const hash = await bcrypt.hash(password, saltRounds);

  let newUser = {
    email: email,
    username: username,
    hashedPassword: hash,
    img: "",
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Error: Creating User failed";

  const userId = insertInfo.insertedId.toString();

  return {
    userId: userId,
  };
};

export const register = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  try {
    await createUser(email, username, password);
  } catch (error) {
    console.log(error);
    return res.status(400).json("User already existed");
  }

  return res.status(200).json("User has been created");
};

export const login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let getUser;
  let output;
  try {
    getUser = await checkUser(username, password);
    output = {
      email: getUser.email,
      img: getUser.img,
      username: getUser.username,
    };
    req.session.blogUserId = getUser.id;
  } catch (error) {
    console.log(error);
    return res.status(400).json("Wrong username or password");
  }
  return res.status(200).json(output);
};

export const logout = (req, res) => {
  try {
    req.session.destroy();
  } catch (error) {
    console.log(error);
    return res.status(500).json("Logout failed");
  }

  return res.status(200).json("User has been logged out");
};
