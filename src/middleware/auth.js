const jwt= require('jsonwebtoken');
const User = require('../models/user');
const cookieParser =require('../utility/cookieParser');





const auth = async (req, res, next)=>{
    

    try{
        //console.log('auth middleware');
        // const token = req.header('Authorization').replace('Bearer ', '');
        const cookies= cookieParser(req);
        const token=cookies.user_session_id;
        const decode= jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({_id: decode._id, 'tokens.token': token});      //special charachter such as . cant be use in keys so we wrap key in ''

        if(!user) throw new Error();

        req.token=token;
        req.user=user;

        //console.log(user);

    } catch (e){
        res.status(401).redirect('/login');
    }
    
    next();
}

module.exports=auth;