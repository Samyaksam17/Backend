const express = require('express')
const app = express();
const mongoose= require('mongoose');
const db_link = require('./secrets');
// console.log(db_link);
app.use(express.json());


mongoose.set('strictQuery', true);
// mongoose.connect(process.env.MONGO_URL)

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
const authRouter = express.Router();
app.use("/user", userRouter);
app.use("/auth", authRouter)

userRouter
    .route("/")
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/:name")
    .get(getUserById);

authRouter
    .route("/signup")
    .get(getSignup)
    .post(postSignup)    


function middleware1(req,res,next) {
    console.log("midleware 1 called");
    next();
}
    
function middleware2(req,res) {
    console.log("midleware 2 called");
    res.json({ msg: "user returned" })
}    


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





async function getUser(req, res){
    console.log(req.query);
    let { name, age } = req.query;
    // let filteredData=user.filter(userObj => {
    //     return (userObj.name==name && userObj.age==age)
    // })
    // res.send(filteredData);

    // get alll users from db
    let allUser=  await userModel.find();
    res.json({msg:"users retrieved",allUser});
    // console.log("get user called");
    // next();
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

async function deleteUser(req, res){
    // user = {};
    // let doc= await userModel.deleteOne({email:"abcd@gmail.com"})
    let doc = await userModel.findOne({ email:"abc@gmail.com" })
    console.log(doc);
    let del = await doc.remove();
    console.log(del);
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


function getSignup(req, res) {
    
    res.sendFile("/public/index.html", { root: __dirname });
}

 async function postSignup(req, res) {
    // let { email, name, password } = req.body;
    try{
    let data = req.body;
    let users = await userModel.create(data);
    console.log(data);
    res.json({
        msg: "user signed up",
        users
        // email,
        // name,
        // password
    })
    }
    catch (err){
        console.log(err);
    }
}





app.listen(5500);

mongoose.connect(db_link)
    .then(function (db){
        console.log(("db connected"));
    })
    .catch(function (err){
        console.log(err);
    })   
    
const userSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength:7,
    },
    confirmPassword:{
        type: String,
        required: true,
        minLength:7,
    },
});   


// models

const userModel = mongoose.model("userModel", userSchema);

// (async function createUser(){
//     let user = {
//         name: 'salksi',
//         email: "abcde@gmail.com",
//         password:"12345678",
//         confirmPassword:"1234568"
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();
