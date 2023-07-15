const TOKEN = require('../../config');
const jwt = require('jsonwebtoken');


function createAccessToken(payload){
    return new Promise((resolve,reject)=>{
        jwt.sign(
            payload,
            TOKEN.TOKEN_SECRET,
            {
                expiresIn:"1d",
            },
            (err,token)=>{
               if(err) reject(err);
               resolve(token) 
        });
    })
}

exports.createAccessToken = createAccessToken;