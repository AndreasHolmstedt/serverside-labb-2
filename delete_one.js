console.log("starting")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var query = { address:  "Allégatan" };
  dbo.collection(collectionName).deleteOne(query, function(err, result) {
    if (err) throw err;
    console.log(`Deleted ${result.deletedCount} count.`);
    db.close();
  });
});

console.log("shutdown")
