/*--------------------------------------------------*/
/*        Del 1                                     */
/*--------------------------------------------------*/


// 1. Skapar slumpmässiga dokument och lägger till dem i en collection

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


//  2. Tar bort alla dokument i en collection

const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var query = {};
  dbo.collection(collectionName).deleteMany(query, function(err, result) {
    if (err) throw err;
    console.log(`Deleted ${result.deletedCount} count.`);
    db.close();
  });
});


//  3. Visar de åtta första elementen i en collection

const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var query = {};
  dbo.collection(collectionName).find(query, {projection: {_id: 0, category: 1, name: 1}}).limit(8).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});



/*--------------------------------------------------*/
/*        Del 2                                     */
/*--------------------------------------------------*/


/*
  1. Hur många dokument finns det i din collection?
    use myDatabase
    db.products.count()

  2. Hur stort värde har alla produkter tillsammans? (summera priset)
    db.products.aggregate([{ $group: {_id: null, antal: { $sum: 1 }, summa: { $sum: "$price"}}}])

  3. Sortera produkterna i första hand fallande efter pris, i andra hand i stigande bokstavsordning efter namn.
    db.products.aggregate( {$sort: { price: -1, name: 1}})

  4. Vilka tre element kommer först i bokstavsordning, sorterat på namnet?
  (Det går att bara läsa de tre första dokument, men den bästa lösningen visar bara tre dokument.)
    db.products.aggregate({ $sort: {name: 1}}, { $limit: 3})

  5. Räkna ut det största och minsta värdet respektive medelvärdet för priset på produkterna.
    db.products.aggregate([ { $group: { _id: null, high: { $max: "$price"}, low: { $min: "$price"}, avg: { $avg: "$price"}}}])

  6. Hur många produkter har ett värde större än medelvärdet? (du kan använda värdet du räknade ut i uppgift 2.5)
    db.products.count({ price: { $gt: 149.4577 }})

  7. Hur många produkter finns det i varje kategori? (gruppera på kategori)
    db.products.aggregate([ { $group: { _id: "$category", count: { $sum: 1}}}])

  8. Välj ut en kategori och visa de fem dyraste produkterna. (match m.m.)
    db.products.aggregate([{ $match: { category: "socks" }}, { $sort: { price: -1 }}, { $limit: 5 }])

  9. Vilken är den tjugonde produkten, sorterat i bokstavsordning efter namn? (limit, skip)
    db.products.aggregate({ $sort: { name: 1 }}, { $limit: 20}, { $skip: 19 })

  10. Välj en av era kategorier. Hur stort värde har alla produkter i den kategorin?
    db.products.aggregate([{ $match: { category: "socks" }}, { $group: { sum: { $sum: "$price"}}}])
*/



/*--------------------------------------------------*/
/*        Del 3                                     */
/*--------------------------------------------------*/


//  1. Skapa JavaScript-filer för att lägga till och ta bort index från databasen.

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


const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name
const collectionName = "products";


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);

  //index = { name: -1 }
  index = { price: -1}

  dbo.collection(collectionName).dropIndex(index, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


/*
2.
  2.7 tog 13.44 sek med 10 510 000 dokument i databasen
  2.8 tog 0.1 sek med 10 510 000 dokument i databasen.
  2.9 tog 22.64 sek med 10 510 000 dokument i databasen

3.
  a. Samtliga queries kommer bli väldigt mycket snabbare.
  b. Endast 2.9 blev snabbare. Summeringen i 2.7 verkar ta lång tid ändå.
  c. Som sagt, endast 2.9 blev snabbare. 2.8 var redan väldigt snabb och 2.7 verkar inte ha förändrats.
  d. Försökte bygga ett index som kunde snabba på 2.7 men lyckades inte få bättre hastighet på den.
*/
