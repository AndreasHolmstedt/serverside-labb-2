console.log("starting")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
	if( err ) throw err;  // if unable to connect
  var dbo = db.db(dbName);

  dbo.createCollection(collectionName, function(err, res) {
    if (err) throw err;
    console.log(`Collection '${collectionName}' created!`);
    db.close();
  });
})


console.log("shutdown")
