const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbname = 'cousera';
const dboper = require('./operations');

MongoClient.connect(url,(err,client) => {
    assert.equal(err,null);
    console.log('Connected correctly to the server...');
    
    const db = client.db(dbname);
    dboper.insertDocument(db,{name:"rava dosa",description:"good"},"dishes")
    .then((result) => {
        console.log("Insert document : ",result.ops);
        return dboper.findDocument(db,"dishes");
    })
    .then((docs)=>{
        console.log("Found document : ",docs);
        return dboper.updateDocument(db,{name:"rava dosa"},{description:"superb"},"dishes");
    })
    .then((result)=>{
        console.log("Updated document : ",result.result);
        return dboper.findDocument(db,"dishes");
    })
    .then((docs)=>{
        console.log("Found document : ",docs);
        return db.dropCollection("dishes");
    })
    .then((result)=>{
        console.log("Dropped Collection : ",result);
        return client.close();
    })
    .catch((err)=>console.log(err));
});