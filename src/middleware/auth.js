const jwt= require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next)=>{
    

    try{
        //console.log('auth middleware');
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode= jwt.verify(token, 'SECret');
        const user = await User.findOne({_id: decode._id, 'tokens.token': token});      //special charachter such as . cant be use in keys so we wrap key in ''

        if(!user) throw new Error();

        req.token=token;
        req.user=user;

        //console.log(user);

    } catch (e){
        res.status(401).send({error:'Please authenticate.'});
    }
    
    next();
}

module.exports=auth;