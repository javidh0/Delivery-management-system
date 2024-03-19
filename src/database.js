const { MongoClient } = require('mongodb');

let clientCon;

function conntectDb(callback){
    MongoClient.connect("mongodb://0.0.0.0:27017/del_man_sys")
    .then((val) => {
        clientCon = val.db('del_man_sys');
        callback();
        console.log("connected");
    })
    .catch((err) => {
        callback(err);
        console.log(err);
    })
}

function getDbConn(){
    return clientCon;
}

module.exports = {
    conntectDb, 
    getDbConn,
}