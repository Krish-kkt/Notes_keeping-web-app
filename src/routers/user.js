const express=require('express');
const router= new express.Router();
const User = require('../models/user');
const auth= require('../middleware/auth');
const jwt= require('jsonwebtoken');


router.get('/user/email/:id', async (req, res)=>{
    const email=req.params.id;
    const user= await User.findOne({email});
    if(!user){
        return res.send({avail: true});
    }else{
        return res.send({avail: false});
    }
})


router.get('/user/auth/:id', async (req,res)=>{
    // const user= new User(req.body);
    // console.log(user);

    // try{
    //     await user.save();
    //     const token= await user.generateAuthToken();
    //     //const userObject= user.getPublicProfile();
    //     res.cookie('user_session_id', token, { maxAge: 604800000, httpOnly: true });

    //     res.status(201).send({user, token});
    // } catch(e){
    //     console.log(e);
    //     res.status(400).send(e);
    // }

    try{

        const token= req.params.id;
        const decode= jwt.verify(token, process.env.JWT_KEY);
    }catch(e){
        console.log(e);
        return res.render('error',{
            errorMsg: 'Not a valid verification link.',
            statusCode: '',
        })
    }

    const token= req.params.id;
    const decode= jwt.verify(token, process.env.JWT_KEY);

    try{
        const user= await User.findOne({email: decode.email});
        if(user){
            return res.render('error',{
                errorMsg: 'Email already verified using this link.',
                statusCode: '',
            });
        }

    }catch(e){
        console.log(e);
        return res.render('error',{
            errorMsg: 'Unable to verify link please try again.',
            statusCode: '',
        });
    }

    try{
        const user= new User({
            name: decode.name,
            email: decode.email,
            password: decode.password
        });
        await user.save();
        const loginToken= await user.generateAuthToken();
        res.cookie('user_session_id', loginToken, { maxAge: 604800000, httpOnly: true });

        res.status(201).redirect('/task');

    }catch(e){
        // console.log(e);
        // if(e.code===11000){
        //     return res.render('error',{
        //         errorMsg: 'Email already verified using this link.',
        //         statusCode: '',
        //     })
        // }
        res.status(400).send(e);
    }


    
})


router.post('/user/login', async (req,res)=>{
    try{
        const user = await User.findByCredential(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        
        //const userObject= user.getPublicProfile();

        res.cookie('user_session_id', token, { maxAge: 604800000, httpOnly: true });
        
        res.send({user, token});
    }catch(e){
        //console.log(e);
        res.status(400).send(); 
    }
})

router.post('/user/logout', auth, async (req,res)=>{
    try{
        req.user.tokens= req.user.tokens.filter((currtoken)=>{
            return currtoken.token !== req.token;
        })

        await req.user.save();
        res.redirect('/login');

    }catch(e){
        res.status(500).render('error', {
            statusCode: 500,
            errorMsg: 'Internal Server Error: Unable to logout'
        });
    }
})

router.post('/user/logoutall', auth, async (req,res)=>{
    try{
        req.user.tokens=[];
        await req.user.save();
        res.redirect('/login');

    }catch(e){

        res.status(500).render('error', {
            statusCode: 500,
            errorMsg: 'Internal Server Error: Unable to logout'
        });
    }
})

router.get('/user/me', auth, async (req, res)=>{

   res.send(req.user);
})

// router.get('/user/:id',async(req,res)=>{
//     const id=req.params;
//     //console.log(id);      return object as { id: '618712a21696cecd12ebc12d' }


//     try{
//         const user= await User.findById(id.id)

//         if(!user){
//             return res.status(404).send();
//         }

//         res.send(user);

//     }catch(e){
//         res.status(500).send();
//     }
    
//     // User.findById(id.id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send({
//     //             Error: 'User not found',
//     //         })
//     //     }
//     //     res.send(user);
//     // }).catch((e)=>{
//     //     res.status(500).send();
//     // })
// })

router.patch('/user/me', auth,  async(req,res)=>{
    const allowedUpdates= ['name', 'email', 'password'];
    const updates= Object.keys(req.body);       //convert all keys in array
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation) return res.status(400).send({error: 'Invalid update'});

    try{
        // //const user= await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        // const user= await User.findById(req.params.id);

        // if(!user){
        //     return res.status(404).send();
        // }

        

        updates.forEach((update)=>{
            req.user[update]=req.body[update];
        })

        await req.user.save();

        

        res.send(req.user);
    }catch(e){
        res.status(404).send(e);
    }
})

router.delete('/user/me', auth, async(req, res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id);

        // if(!user) return res.status(404).send();
        await req.user.remove();

        res.send(req.user);
    }catch(e){
        res.status(500).send();
    }


})



module.exports=router;