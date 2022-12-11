const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send("<h1>Hello world 123</h1>");
})
app.get('/about', function (req, res) {
    res.sendFile('views/about.html');
})

app.get('/aboutus', function (req, res) {
    res.redirect('/about');
})  

app.use((req,res) =>{
    res.status(404);
})


app.listen( 3000, 'localhost' , () => {
    console.log("server is running on porrt 3000");
})