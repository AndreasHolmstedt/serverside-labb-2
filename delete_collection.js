console.log("starting")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var query = { address:  /^H/ };
  dbo.collection(collectionName).drop(function(err, delOk) {
    if (err) throw err;
    delOk ? console.log("Collection deleted.") : null
    db.close();
  });
});

console.log("shutdown")
