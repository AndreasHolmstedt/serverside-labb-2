const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  dbo.collection(collectionName).find({}, { projection: {_id: 0, name: 1}}).toArray(function(err, result) {
    if (err) throw err;
    console.log(`There is a total of ${result.length} document(s) in the collection.`);
    db.close();
  });
});


console.log("shutdown")
