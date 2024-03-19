
function generateAccessToken(){

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
                 console.log("succesfull");
                 next();
                }
            else console.log("failed");
        }
    )
}

module.exports = {
    authenticateUser, 
    generateAccessToken
}