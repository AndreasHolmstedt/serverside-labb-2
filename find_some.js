console.log("starting")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";


/*
The second parameter of the find() method is the projection object that describes which fields to include in the result.
This parameter is optional, and if omitted, all fields will be included in the result.
*/

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  dbo.collection(collectionName).find({}, { projection: { _id: 0, name: 1, address: 1, hej: 1}}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


console.log("shutdown")
