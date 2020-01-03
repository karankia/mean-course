  const express = require("express");
  const bodyParser = require("body-parser");
  const mongoose = require('mongoose');

  const Post = require('./models/post');

  const app = express();

  mongoose.connect("mongodb+srv://karan:karan123@cluster0-j1bur.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
      console.log("Connected to DB")
    })
    .catch((e) => {
      console.log("Connection Failed" + e);
    });

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.post("/api/posts", (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save().then( createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        createdPost : createdPost._id
      });
    });

  });

  app.put("/api/posts/:id", (req, res, next) => {
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
      res.status(200).json({ message: "Update successful"});
    })
  });

  app.get('/api/posts', (req, res, next) => {
    Post.find().then((documents) =>{
      res.status(200).json({
        message: 'posts fetched successfully',
        posts: documents
      });
    });
  });

  app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then( (result) => {
      res.status(200).json({ message: "Post Deleted" });
    });

  });

  module.exports = app;


