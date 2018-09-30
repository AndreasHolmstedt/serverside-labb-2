console.log("starting")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";

const generateProduct = require('./generate_product.js')


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);

  for (i=0;i<10000; i++){
    var product = generateProduct();
    dbo.collection(collectionName).insertOne(product, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      console.log("result: ", res.result)
      db.close();
    });
  }
});

console.log("shutdown")
