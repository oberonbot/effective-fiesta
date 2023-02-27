import dbConnection from "./mongoConnection.js";

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export default {
  artists: getCollectionFn("artists"),
  artworks: getCollectionFn("artworks"),
  albums: getCollectionFn("albums"),
  tags: getCollectionFn("tags"),
  galleryUsers: getCollectionFn("galleryUsers"),

  blogUsers: getCollectionFn("blogUsers"),
  posts: getCollectionFn("posts"),
};
