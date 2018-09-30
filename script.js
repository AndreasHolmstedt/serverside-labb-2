console.log("starting")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
	if( err ) throw err;  // if unable to connect
	const db = client.db(dbName);  // ansluten
  console.log("connected")

  const insertDocuments = (db, callback) => {
    // Get the documents collection
    const testCollection = db.collection('testCollection');
    // Insert some documents
    testCollection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], (err, result) => {
      if( err ) {
        console.log("An error occured: ")
        console.log(err)
      }
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }
  // insertDocuments(db, result => {
  //   console.log(result)
  // })


  const printCollection = (db, callback) => {
    console.log("starting printCollection")
    console.log(db.collection('testCollection'))
  }
  // printCollection(db, result => {
  //   console.log(result)
  // })


  const findAll = (db, callback) => {
    console.log("running find all")
    const all = db.collection("testCollection").find({a: 1}).sort({a: -1})

    console.log(all)
  }
  findAll(db, result => {
    //console.log(result)
  })







	//client.close();  // remember to close connections when done
});
