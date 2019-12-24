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
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.post("/api/posts", (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save();
    res.status(201).json({
      message: "Post added successfully"
    });
  });

  app.get('/api/posts', (req, res, next) => {
    const posts = [
      {
        id: '1234',
        title: 'First Server Side Post',
        content: 'Coming from server'
      },
      {
        id: "1235",
        title: "Second server side post",
        content: 'Coming from server'
      }
    ];
    res.status(200).json({
      message: 'posts fetched successfully',
      posts: posts
    });
  });

  module.exports = app;


