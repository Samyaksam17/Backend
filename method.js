const express = require('express')
const app = express();
app.use(express.json());


let user = {};

app.get('/user', (req,res) => {
    res.send(user);
})

app.post('/user', (req,res) => {
    console.log(req.body);
    res.json({
        message: "Data recieved successfully",
        user: req.body
    });
})

app.patch('/user', (req,res) => {
    console.log(req.body);
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        user[key] = dataToBeUpdated[key];
    }
    res.json({
        message:"data updated successfully"
    })
});

app.delete('/user', (req,res) => {
    user = {};
    res.json({
        message: "user has been deleted"
    })
})

app.listen(5500);