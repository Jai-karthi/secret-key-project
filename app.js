//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const app  = express()

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
    extended : true
}))

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true})


const Userschema = {
    email: String ,
    password:  String       
}

const  User = new mongoose.model("User",Userschema);


app.get("/",function(req,res){
    res.render("home")
})

app.get("/login",function(req,res){
    res.render("login")
})

app.get("/register",function(req,res){
    res.render("register")
})

app.get('/logout',function(req,res){
    res.render('home')
})

app.get('/submit',function(req,res){
    res.render('submit')
})

app.post("/register",function(req,res){
    const newuser = new User({
        email: req.body.username,
        password: req.body.password
})
    

    newuser.save(function(err){
        if (err){
            console.log(err);
        }else{
            res.render("secrets")
        }
    })

    newuser.save()
    .then( secrets=> {
        res.render("secrets") 
    })
    .catch(err => {
        console.log(err)
    });

})



// 

app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: username })
        .then(foundUser => {
            if (foundUser && foundUser.password === password) {
                res.render("secrets");
            } else {
                res.render("login"); // You might want to handle invalid credentials differently
            }
        })
        .catch(err => {
            console.log(err);
        });
});




app.listen(3000,function(){
    console.log("server started on port 3000 ")
})