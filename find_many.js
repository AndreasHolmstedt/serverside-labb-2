console.log("starting")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  query = {}
  dbo.collection(collectionName).find(query, { projection: {_id: 0, name: 1, price: 1}}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    console.log(`Found ${result.length} document(s)`);
    db.close();
  });
});


console.log("shutdown")
