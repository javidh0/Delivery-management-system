const express = require('express');
const {getDbConn, conntectDb} = require('./database');
const {ROLES, DB_ACCESS} = require("./authorization/roles.js");
const { ObjectId } = require('mongodb');
const {authenticateUser, validateAuthentication} = require('./authentication/authenticate.js');

const app = express();
app.use(express.json());
let conn;

function server(error){
  if(!error){
    conn = getDbConn();
    app.listen(1729, () => {
        console.log(`Successfully started server on port 1729.`);
    });

    let a_token;

    authenticateUser( 
        {'user_id':'id_1', 'cred':['javidh', 'pass1']}, 
        conn,
        (token) => {
          a_token = token;
          console.log(a_token);
          validateAuthentication(
            conn,
            'id_1',
            a_token,
            (tkn) => {
              console.log(tkn);
            },
          )
        }
      )
  }
}

conntectDb(server);

app.get('/', (req, res) => {
  conn.collection('users').findOne({'name':'javidh'})
  .then(val => {
    const id = val._id;
    // conn.collection('access_tokens').find({'user' : id}).forEach(element => {
    //   console.log(element);
    // });
    // conn.collection('access_tokens').insertOne({'user': id, 'token': 'totot', 'time': new Date()}).then(
    //   () => {console.log("done--")}
    // );
    const role = val.roles;
    console.log(ROLES[role]);
  });
  res.send("hello");
})