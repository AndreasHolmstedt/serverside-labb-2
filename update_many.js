console.log("starting")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "customers";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var query = { address:  /^C/ };
  var updates = { $set: { phone: "112" } };
  dbo.collection(collectionName).updateMany(query, updates, function(err, result) {
    if (err) throw err;
    console.log(result.result.nModified + " document(s) updated");
    db.close();
  });
});

console.log("shutdown")
