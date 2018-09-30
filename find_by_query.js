console.log("starting")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var query = { category: "t-shirt", price: { $lt: 75 }};
  dbo.collection(collectionName).find(query, {projection: {_id: 0, category: 1, name: 1, price: 1}}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


console.log("shutdown")
