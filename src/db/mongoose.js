const mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
 useNewUrlParser: true,
 //useCreateIndex: true
});


// const me= new User({
//     name: 'Krishna',
//     email: 'krish@gmail.com',
//     password: 'afsjfn jasfl',
// })

// // me.save().then((res)=>{
// //     console.log(res);
// // }).catch((err)=>{
// //     console.log(err);
// // })



// const task=new Task({
//     description: '  Got to   complete node course.'
// })

// task.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })
