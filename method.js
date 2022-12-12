const express = require('express')
const app = express();
app.use(express.json());


let user = [
 {
    id: 1,
    name: "samyak",
    age: 20,
 } ,
 {
    id: 2,
    name: "sammy",
    age: 30,
 } ,
 {
    id: 3,
    name: "samieeeee",
    age: 40,
 } ,

];

const userRouter = express.Router();
app.use('/user', userRouter);

userRouter
    .route("/")
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/:name")
    .get(getUserById);


// app.get('/user', (req,res) => {
//     res.send(user);
// })

// with query
// app.get('/user', (req,res) => {
//     console.log(req.query);
//     res.send(user);
// })

// app.post('/user', (req,res) => {
//     console.log(req.body);
//     res.json({
//         message: "Data recieved successfully",
//         user: req.body
//     });
// })

// app.patch('/user', (req,res) => {
//     console.log(req.body);
//     let dataToBeUpdated = req.body;
//     for(key in dataToBeUpdated){
//         user[key] = dataToBeUpdated[key];
//     }
//     res.json({
//         message:"data updated successfully"
//     })
// });

// app.delete('/user', (req,res) => {
//     user = {};
//     res.json({
//         message: "user has been deleted"
//     })
// })


// // parameters

// app.get('/user/:id', (req,res) => {
//     // /user/:name
//     console.log(req.params.id);
//     // let {id} = req.params;
//     // let user = db.findOne(id);
//     res.json({ msg:"user id is ", "obj": req.params });
// })





function getUser(req, res){
    console.log(req.query);
    let { name, age } = req.query;
    // let filteredData=user.filter(userObj => {
    //     return (userObj.name==name && userObj.age==age)
    // })
    // res.send(filteredData);
    res.send(user);
}

function postUser(req, res){
    console.log(req.body.Name);
    //then i can put this in db 
    user.push(req.body);
    res.json({
        message: "Data received successfully",
        user: req.body
    });
}

function updateUser(req, res){
    console.log(req.body);
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        user[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated succesfully"
    })
}

function deleteUser(req, res){
    user = {};
    res.json({
        msg: "user has been deleted"
    });
}

function getUserById(req, res){
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", "obj": req.params });
}








app.listen(5500);