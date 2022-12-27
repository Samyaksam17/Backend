const mongoose= require('mongoose');
const db_link = require('../secrets');
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt')


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
        validate: function(){
            return emailValidator.validate(this.email);
        }
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
        validate: function () {
            return this.confirmPassword==this.password
        }
    },
}); 


// --------------->learning hooks<--------------------
// userSchema.pre('save' , function(){ //remove for removing
//     console.log("before saving in db");
// });

// userSchema.post('save' , function(){
//     console.log("after saving in db");
// });

userSchema.pre ('save', async function(){
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    console.log(hashedString);
})

 // models

const userModel = mongoose.model("userModel", userSchema);
module.exports= userModel;
