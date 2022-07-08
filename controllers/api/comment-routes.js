//Import required packages and files 
const router = require("express").Router();
const {User, Launch, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//Export router
module.exports = router;