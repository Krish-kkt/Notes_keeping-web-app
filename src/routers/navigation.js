const express=require('express');
const router= new express.Router();
const User = require('../models/user');
const jwt= require('jsonwebtoken');
const cookieParser =require('../utility/cookieParser');
const {sendVerificationEmail}= require('../emails/account');


router.get('/', async (req, res)=>{
    try{
        const cookies= cookieParser(req);
        const token=cookies.user_session_id;
        const decode= jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({_id: decode._id, 'tokens.token': token});      //special charachter such as . cant be use in keys so we wrap key in ''

        if(!user) throw new Error();
        res.redirect('/task');

    } catch (e){
        res.render('about');
    }  
})

router.get('/login', async (req,res)=>{

    try{
        const cookies= cookieParser(req);
        const token=cookies.user_session_id;
        const decode= jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({_id: decode._id, 'tokens.token': token});      //special charachter such as . cant be use in keys so we wrap key in ''

        if(!user) throw new Error();
        res.redirect('/task');

    } catch (e){
        res.render('login');
    }

    
})

router.post('/signup', async (req, res)=>{

    

    try{

        const token= jwt.sign({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, process.env.JWT_KEY , {expiresIn: '1h'});

        await sendVerificationEmail(req.body.email, req.body.name, `https://krishna-notes-keeper-app.herokuapp.com/user/auth/${token}`);
        res.render('error',{
            errorMsg: 'A verification link is sent to you mail, please verify.',
            statusCode: ''
        });


    }catch(e){
        console.log(e);
        res.render('error', {
            errorMsg: 'Unable to sign-up, please try again.',
            statusCode: '',
        })
    }
})



module.exports=router;