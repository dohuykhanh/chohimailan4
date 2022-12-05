const { MongoClient } = require('mongodb')

const url = 'mongodb+srv://todo:todo123456@cluster0.dqbwvlw.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = "User_Management"
const db = {}

async function connectToDb() {
    await client.connect();
    console.log('Connected successfully to Database');
    const database = client.db(dbName);

    db.Group = database.collection("Group");
    db.Item = database.collection("Item");
    db.Task = database.collection("Task");
    db.User = database.collection("User");

    return 'done.';
}

module.exports = { connectToDb, db }