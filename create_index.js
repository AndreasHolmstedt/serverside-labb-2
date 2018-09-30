const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);

  index = {}
  options = {}

  //index = { name: -1 }
  //index = { price: 1}

  index = { category: -1 }
  option = { partialFilterExpression: { price: { $gt: 100 }} }

  dbo.collection(collectionName).createIndex(index, option, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
