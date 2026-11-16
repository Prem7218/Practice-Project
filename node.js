require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;

const client = new MongoClient(url);
const dbName = 'demo_db';

async function main() {

    await client.connect();
    console.log('Connected successfully to server!');

    const db = client.db(dbName);
    const collection = db.collection('demo');

    const data = {
        fname: 'John-2',
        lname: 'masli-2',
    }

    // const insertData = await collection.insertMany([data]);
    // console.log("Inserted: ", insertData);

    // const getData = await collection.find({}).toArray();
    // console.log("Data: ", getData);

    const findWithFName = await collection.find({ fname: "John-2" }).toArray();
    console.log("found: ", findWithFName);

    return 'done';
}

main()
 .then(console.log)
 .catch(console.error)
 .finally(() => client.close());