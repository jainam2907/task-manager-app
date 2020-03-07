const express = require('express');
require('./db/mongoose.js');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next)=>{
//     res.status(503).send('Servers are under maintenance... Try again later!');
// });

app.use(express.json()); 
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=>{
    console.log("Server is up and running on port " + port);
});


// const Task = require('./models/task');
// const User = require('./models/user');
// const main = async ()=>{
//     // const task = await Task.findById("5e443e2f1df312245dad7abc");
//     // await task.populate('owner').execPopulate()
//     // console.log(task);

//     const user = await User.findById('5e443d8aae85d823fba5a8d7');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }
// main();

// const jwt = require('jsonwebtoken');

// const func = async() =>{
//     const token = jwt.sign({ _id: 'JC1234'}, 'Thebestisyettocome', {expiresIn: '5 seconds'});
//     console.log(token);

//     const data = jwt.verify(token, 'Thebestisyettocome');
//     console.log(data);

//     setTimeout(()=>{
//         const data = jwt.verify(token, 'Thebestisyettocome');
//         console.log(data);
//     },7000)
// }

// func();