const express=require('express');
const Task= require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();


const varia='42';


router.post('/task', auth, async(req,res)=>{
    //const task= new Task(req.body);

    const task = new Task({
        ...req.body,
        owner: req.user._id,
    })

    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }

    // task.save().then((response)=>{
    //     res.status(201).send(response);
    // }).catch((err)=>{
    //     res.status(400).send({
    //         Error: 'Task not created'
    //     })
    // })
})

router.get('/task', auth, async (req,res)=>{

    try{
        //const tasks= await Task.find({owner: req.user._id});

        await req.user.populate('tasks');
        // console.log(req.user.tasks);
        res.render('list', {
            name: req.user.name,
            tasks: req.user.tasks,
        });
        // res.render(req.user.tasks);
    }catch(e){
        res.status(500).send();
    }

    // Task.find({}).then((tasks)=>{
    //     res.send(tasks);
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // })
})


router.patch('/task', auth,  async(req,res)=>{
    const allowedUpdates= ['description','completed', 'id'];
    const updates= Object.keys(req.body);       //convert all keys in array
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation) return res.status(400).send({error: 'Invalid update'});

    try{
        //const task= await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        const task = await Task.findOne({_id: req.body.id, owner: req.user._id});
        
        if(!task){
            return res.status(404).send();
        }

        updates.forEach((update) => {
            if(update!=='id') task[update]= req.body[update];
            
        });

        await task.save();

        res.send(task);
    }catch(e){
        res.status(404).send(e);
    }
})

router.delete('/task/:id', auth, async(req, res)=>{
    try{
        //const task = await Task.findByIdAndDelete(req.params.id);

        const task= await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});

        if(!task) return res.status(404).send();
        res.send(task);
    }catch(e){
        res.status(500).send();
    }


})

module.exports= router;