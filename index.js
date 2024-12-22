const express = require("express");
const {userModel,todoModel} = require('./db')
const jwt = require('jsonwebtoken')
const JWT_SECRET="secretKey"
const mongoose = require('mongoose')

mongoose.connect("url of mongodb")
const app = express();


app.use(express.json())

app.post("/signup",async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await userModel.create({
        email:email,
        password:password,
        name:name
    })
    res.json({
        message:"done"
    })

});
app.post("/signin",async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email:email,
        password:password
    })
    if(user){
        const token =jwt.sign({
            id:user._id.toString()
        },JWT_SECRET)
        res.json({
            token:token
        })

    }else{
        res.status(403).json({
            message:"invalid email or password"
        })
    }
});

app.post("/todos",auth, function (req, res) {
    const userId = req.userId
    const title = req.body.title
    todoModel.create({
        title,
        userId
    })
    res.json({
        userId:userId
    })
});
app.get("/todos",auth, async function (req, res) {
    const userId = req.userId

    const users = await todoModel.find({
        userId:userId

    })

    res.json({
        userId:userId
    })
});

function auth(req,res,next){
    const token = req.headers.token

    const decoded = jwt.verify(token,JWT_SECRET)
    if(decoded){
        req.userId = decoded.id
        next()
    }else{
        res.status(403).json({
            message:"invalid token"
        })
    }
}

app.listen(3000);
