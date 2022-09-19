import { MongoClient } from 'mongodb';

const url = process.env.ConfigUrlMongoDB;
const database = process.env.ConfigDatabaseName;

const findOne = async (collectionName, query = {}) => {
  const client = await MongoClient.connect(url).catch((err) => {
    console.log(err);
  });

  if (!client) return;

  try {
    const collection = client.db(database).collection(collectionName);

    let res = await collection.findOne(query);

    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const insertOne = async (collectionName, query = {}) => {
  const client = await MongoClient.connect(url).catch((err) => {
    console.log(err);
  });

  if (!client) return;

  try {
    const collection = client.db(database).collection(collectionName);

    let res = await collection.insertOne(query);

    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

export { findOne, insertOne };
