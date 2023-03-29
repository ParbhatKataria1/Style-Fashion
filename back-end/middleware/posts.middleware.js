
const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next)=>{
    try {
        let token = req.headers.authorization;
        jwt.verify(token, 'masai', function(err, decoded) {
            if(err)res.status(400).send({"msg":"token provided is wrong"});
            if(decoded.userId){
                req.body.userId = decoded.userId;
                next();
            }
            console.log(decoded.foo) // bar
          });
    } catch (error) {
        res.status(400).send({"msg":"token provided is wrong, lower"});
    }
}

module.exports = {verifyUser}