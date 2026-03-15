const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

// Connect to the in-memory database
module.exports.connect = async () => {
  // If already connected, do nothing
  if (mongoose.connection.readyState !== 0) {
    return;
  }
  
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
};

// Drop database, close the connection and stop mongod
module.exports.closeDatabase = async () => {
  if (mongoose.connection) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
  if (mongod) {
    await mongod.stop();
  }
};

// Clear all data out of the collections
module.exports.clearDatabase = async () => {
  if (mongoose.connection && mongoose.connection.collections) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
};
