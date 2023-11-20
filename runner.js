const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'your_database_name';
const collectionName = 'your_collection_name';

const filePath = 'path/to/your/file.json';  // Replace with the actual path

const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  collection.insertOne(jsonData, (insertErr, result) => {
    if (insertErr) {
      console.error('Error inserting into MongoDB:', insertErr);
    } else {
      console.log('Document inserted:', result.ops[0]);
    }

    client.close();
  });
});
