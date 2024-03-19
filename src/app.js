const express = require('express');
const {getDbConn, conntectDb} = require('./database');
const {ROLES, DB_ACCESS} = require("./authorization/roles.js");

const app = express();
app.use(express.json());
let conn;

function server(error){
  if(!error){
    conn = getDbConn();
    app.listen(1729, () => {
        console.log(`Successfully started server on port 1729.`);
    });
  }
}

conntectDb(server);

app.get('/', (req, res) => {
  conn.collection('users').findOne({'name':'javidh'}, {'roles':1})
  .then(val => {
    const role = val.roles;
    console.log(ROLES[role]);
  });
  res.send("hello");
})