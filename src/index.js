const express= require('express');
const ejs = require('ejs');
const path= require('path');
//const cookieParser=  require('cookie-parser');
const jwt= require('jsonwebtoken');
const cookieParser =require('./utility/cookieParser');


require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task');

const userRouter = require('./routers/user');
const taskRouter= require('./routers/task');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath=path.join(__dirname, '../templates/views');




const app=express();
const port= process.env.PORT;

// app.use((req,res, next)=>{
//     console.log('Request on hold');
//     res.status(503).ssend('On maintainance');

//     //next();        //will allow request when it is called.
// })

app.use(express.static(publicDirectoryPath));

app.set('views', viewsPath );
app.set('view engine', 'ejs');
app.use(express.json());    
app.use(userRouter);
app.use(taskRouter);




app.get('/', async (req, res)=>{
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

app.get('/login', async (req,res)=>{

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


app.listen(port, ()=>{
    console.log('Server is up on port '+port);
})







