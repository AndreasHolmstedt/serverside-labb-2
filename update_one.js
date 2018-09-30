console.log("starting")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "customers";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var query = { name:  "Ica" };
  var updates = { $set: { address: "Allégatan 18" } };
  dbo.collection(collectionName).updateOne(query, updates, function(err, result) {
    if (err) throw err;
    console.log("Matched count", result.matchedCount);
    db.close();
  });
});

console.log("shutdown")
