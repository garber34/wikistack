const express = require("express");
const router = express.Router();
const userList = require("../views/userList");
const userPages = require("../views/userPages");
const { User } = require("../models");
const { Page } =require("../models");

router.get("/", async (req, res,next) => {
  try{
  const users = await User.findAll();

  res.send(userList(users));
  } catch(err){
    next(err)}
});

router.get("/:id", async (req, res,next) => {
  try{
      const user = await User.findOne({where:{id:req.params.id}});
  const usersPages = await Page.findAll({where:{authorId:req.params.id}});
  res.send(userPages(user,usersPages));
  }catch(err){next(err)}

});

router.use(function(err,req,res,next){
  res.send(err);
})

module.exports = router;
