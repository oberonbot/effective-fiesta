import mongoCollections from "../../config/mongoCollections.js";
const auth = mongoCollections.galleryUsers;
import bcrypt from "bcryptjs";
const saltRounds = 16;

const createUser = async (email, password) => {
  const authCollection = await auth();
  const getAuthWithEmail = await authCollection.findOne({ email: email });
  if (getAuthWithEmail) {
    throw `Error: User already existed`;
  }
  const hash = await bcrypt.hash(password, saltRounds);

  let newAuth = {
    email: email,
    hashedPassword: hash,
  };

  const insertInfo = await authCollection.insertOne(newAuth);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Error: Creating User failed";

  const authId = insertInfo.insertedId.toString();

  return {
    authId: authId,
  };
};

export const register = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  try {
    await createUser(email, password);
  } catch (error) {
    console.log(error);
    return res.status(400).json("User already existed");
  }

  return res.status(200).json("User has been created");
};

const checkUser = async (email, password) => {
  const authCollection = await auth();
  const getAuth = await authCollection.findOne({ email: email });

  if (getAuth === null) {
    throw "Error: Either email or password is invalid";
  }
  const comparePassword = await bcrypt.compare(
    password,
    getAuth.hashedPassword
  );
  if (comparePassword) {
    return {
      email: getAuth.email,
      id: getAuth._id.toString(),
    };
  } else {
    throw "Error: Either email or password is invalid";
  }
};

export const login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let getUser;
  let output;
  try {
    getUser = await checkUser(email, password);
    output = {
      email: getUser.email,
      id: getUser.id,
    };
    req.session.galleryUserId = getUser.id;
  } catch (error) {
    console.log(error);
    return res.status(400).json("Wrong email or password");
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
