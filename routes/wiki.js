const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const wikiPage = require("../views/wikiPage");
const main = require("../views/main");
const { Page } = require("../models");
const { User } = require("../models");

router.get("/", async (req, res) => {
  const allPages = await Page.findAll();

  res.send(main(allPages));
});

router.post("/", async (req, res, next) => {
  try {
    const [author, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email,
      },
    });

    const createdObject = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });

    createdObject.setAuthor(author);

    console.log(createdObject);
    try {
      await createdObject.save();
      res.redirect(`/wiki/${createdObject.slug}`);
    } catch (error) {
      next(error);
    }

    console.log(createdObject);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res) => {
  const page = await Page.findOne({ where: { slug: req.params.slug } });
  const author = await page.getAuthor();
  res.send(wikiPage(page,author));
});

router.use(function (err, req, res, next) {
  if (err.message.includes("isEmail"))
    res.send("Author email was not in the correct format");
    else res.send(err);
});

module.exports = router;
