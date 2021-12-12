const express= require('express');
const ejs = require('ejs');
const path= require('path');
//const cookieParser=  require('cookie-parser');



require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task');

const userRouter = require('./routers/user');
const taskRouter= require('./routers/task');
const navigationRouter= require('./routers/navigation');

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
app.use(express.json());                                //for handling/parsing form data
app.use(express.urlencoded({extended: false}));         //for handlin/parsing json data 
app.use(userRouter);
app.use(taskRouter);
app.use(navigationRouter);







app.listen(port, ()=>{
    console.log('Server is up on port '+port);
})







