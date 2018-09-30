console.log("starting")
const MongoClient = require('mongodb').MongoClient;
// Default URL for connecting to database
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';  // Database Name

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
	if( err ) throw err;  // if unable to connect
	const db = client.db(dbName);  // ansluten
  console.log("Database created")
  client.close();
})


console.log("shutdown")
