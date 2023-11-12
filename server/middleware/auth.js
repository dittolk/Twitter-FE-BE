const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        try{
            let token = req.headers.authorization
            if(token == null){
                return res.status(401).send({
                    message: "Token is empty"
                })
            }
            token = token.split(' ')[1]

            let verifiedUser = jwt.verify(token, 'TwitterNotX')
            req.user = verifiedUser //buat property baru di object req
            next()
        }catch(err){
            console.log(err);
            res.status(400).send(err)
        }
    }
}