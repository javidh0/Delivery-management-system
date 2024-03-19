const {getDbConn} = require('../database');
const conn = getDbConn();

// '65f8143f7836367834be0b46'

function authenticated(req, res, next){
    const uid = req.userId;
    if(!conn.collections('users').findOne(uid)){
        next();
        return 'ok';
    }
    return ;
}