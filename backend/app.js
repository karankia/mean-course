  const express = require("express");
  const bodyParser = require("body-parser");
  const mongoose = require('mongoose');
  const postRoutes = require('./routes/posts');

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

  app.use("/api/posts", postRoutes);

  module.exports = app;


