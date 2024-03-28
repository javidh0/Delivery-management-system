const {validateAuthentication} = require('../authentication/authenticate.js');
const { ROLES } = require('./roles.js');

function authorizeUserRole(conn, user_id, role, token, next) {
    validateAuthentication(
        conn, user_id, token,
        (val) => {
            if(val == '-1') return next({
                'status' : '-1',
                'reason' : 'NSI',
            })
            else {
                conn.collection('users').findOne({'user_id' : user_id})
                .then(
                    (val) => {
                        if(ROLES[val['roles']] == role) {
                            return next({
                                'status' : '1',
                                'role' : role,
                            })
                        }
                        else {
                            return next({
                                'status' : '-1',
                                'reason' : 'NA',
                            })
                        }
                    }
                )
            }
        }
    )
}

module.exports = {
    authorizeUserRole,
}