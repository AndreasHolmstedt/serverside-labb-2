const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";

const generateProduct = require('./generate_product.js')

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var products_to_insert = [];

  for(i=0;i<1000000;i++){
    products_to_insert.push(generateProduct())
  }

  dbo.collection(collectionName).insertMany(products_to_insert, function(err, res) {
    if (err) throw err;
    console.log("result: ", res.result)
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
