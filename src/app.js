const express = require('express');
const {getDbConn, conntectDb} = require('./database');
const {ROLES, DB_ACCESS} = require("./authorization/roles.js");
const { ObjectId } = require('mongodb');
const {authenticateUser, validateAuthentication} = require('./authentication/authenticate.js');
const {authorizeUserRole} = require('./authorization/authorization.js');

const app = express();
app.use(express.json());
let conn;

function server(error){
  if(!error){
    conn = getDbConn();
    app.listen(1729, () => {
        console.log(`Successfully started server on port 1729.`);
    });

    let a_token = '66057ca8c44dabd554891f39';

    // validateAuthentication(
    //   conn, 'id_1', a_token, 
    //   (val) => {
    //     console.log(val);
    //   }
    // ) 

    authenticateUser( 
        {'user_id':'id_1', 'cred':['javidh', 'pass1']}, 
        conn,
        (token) => {
          console.log(token);
          authorizeUserRole(conn, 'id_1', ROLES.CUSTOMER, token,
            (val) => {
              console.log(val);
            }
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