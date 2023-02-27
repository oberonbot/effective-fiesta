import { MongoClient } from "mongodb";
const settings = {
  mongoConfig: {
    serverUrl: "mongodb://localhost:27017/",
    database: "portfolioReact",
    // database: "gallery",
  },
};
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

export default {
  dbConnection: async () => {
    if (!_connection) {
      _connection = await MongoClient.connect(mongoConfig.serverUrl);
      _db = await _connection.db(mongoConfig.database);
    }

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  },
};
