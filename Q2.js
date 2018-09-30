const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  let totalValue = 0
  dbo.collection(collectionName).find({}, { projection: {_id: 0, price: 1}}).toArray(function(err, result) {
    if (err) throw err;
    for (let i in result){
      totalValue += result[i].price
    }
    console.log(`The total value of all products in the shop is: ${totalValue}`)
    db.close();
  });
});


console.log("shutdown")
