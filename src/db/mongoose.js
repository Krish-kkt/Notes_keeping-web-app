const mongoose= require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
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
