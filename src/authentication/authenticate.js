function validateAuthentication(conn, user_id, token, next){
    conn.collection('access_tokens').findOne({'user_id':user_id})
    .then(val => {
        if(val != null){
            if(val['_id'] == token.toString()){
                let time = new Date()
                time.setMinutes(time.getMinutes()-5);
                if(val['time'] < time){ 
                    next("time limit ex");
                    conn.collection('access_tokens').deleteOne({'user_id':user_id});
                }else{
                    next(val['_id'].toString());
                }
            }else{
                next('-1');
            }
        }else{
            next('-1');
        }
    })
}

function generateAccessToken(conn, user, next){
    conn.collection('access_tokens').findOne({'user_id':user})
    .then(val => {
        if(val != null) {
            return next(val['_id'].toString());
        }else{
            conn.collection('access_tokens').insertOne({'user_id': user, 'time':new Date()})
            .then((val) => {
                next(val['insertedId'].toString());
            }).catch((err)=>{
                next(err);
            })
        }
    });
}

function authenticateUser(data, conn, next){
    let token = '-1';
    conn.collection('users').findOne({'user_id':data.user_id})
    .then(
        val => {
            if(
                data.cred[0] == val.cred[0] 
                && data.cred[1] == val.cred[1]
                ){  
                    generateAccessToken(conn, data.user_id, next)
                }
            else{ 
                return next('-1');
            }
        }
    )
}

module.exports = {
    authenticateUser, 
    generateAccessToken,
    validateAuthentication,
}