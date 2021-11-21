const express=require('express');
const router= new express.Router();
const User = require('../models/user');
const auth= require('../middleware/auth');

router.post('/user', async (req,res)=>{
    const user= new User(req.body);
    //console.log(user);

    try{
        await user.save();
        const token= await user.generateAuthToken();
        //const userObject= user.getPublicProfile();

        res.status(201).send({user, token});
    } catch(e){
        res.status(400).send(e);
    }

    // user.save().then((response)=>{
    //     res.status(201).send(response);
    // }).catch((err)=>{
    //     res.status(400).send({
    //         Error: 'User not created'
    //     })
    // })
    
})


router.post('/user/login', async (req,res)=>{
    try{
        const user = await User.findByCredential(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        
        //const userObject= user.getPublicProfile();
        
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
        res.send();

    }catch(e){
        res.status(500).send();
    }
})

router.post('/user/logoutall', auth, async (req,res)=>{
    try{
        req.user.tokens=[];
        await req.user.save();
        res.send();

    }catch(e){

        res.status(500).res.send();
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