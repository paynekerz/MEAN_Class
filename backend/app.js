const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express();

mongoose.connect("mongodb+srv://payne-admin:jigantie@cluster0.qwtgw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log('Connection Failed');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        conntent: req.body.content
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post Added!',
            postId: createdPost._id
        });
    });  
});


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    next();
});

app.get('/api/posts', (req, res, next) =>{
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts Fetched',
            posts: documents
        });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message:"Post Deleted!"});
    })
});

module.exports = app;
