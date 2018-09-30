const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  let averageValue = 0
  let lowestValue = 249
  let highestValue = 0

  dbo.collection(collectionName).find({}, { projection: {_id: 0, price: 1}}).toArray(function(err, result) {
    if (err) throw err;
    for (let i in result){
      averageValue += result[i].price
      result[i].price < lowestValue ? lowestValue = result[i].price : null
      result[i].price > highestValue ? highestValue = result[i].price : null
    }
    averageValue = averageValue / result.length
    console.log(`The average value of all products in the shop is: ${averageValue}`)
    console.log(`The product with the lowest value costs: ${lowestValue}`)
    console.log(`The product with the highest value costs: ${highestValue}`)
    db.close();
  });
});


console.log("shutdown")
