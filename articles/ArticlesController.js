const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles",(req, res) => {
  Article.findAll({
    include: [{model: Category}]
  }).then(articles => {
    res.render("admin/articles/index", {articles: articles})
  });
});

router.get("/admin/articles/new",(req, res) => {
  Category.findAll().then(categories => {
    res.render("admin/articles/new", {categories: categories});
  })
});

router.post("/articles/save", (req, res) => {
  var { title } =  req.body;
  var { body } =  req.body;
  var { category } =  req.body;

  Article.create({
    title,
    slug: slugify(title),
    body,
    categoryId: category
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

router.post("/articles/delete", (req, res) => {
  var { id } = req.body;
  if(id != undefined) {
    if(!isNaN(id)){
      Article.destroy({
        where: {
          id : id
        }
      }).then(() => {
        res.redirect("/admin/articles");
      });
    }else{//NÂO FOR UM NÚMERO
      res.redirect("/admin/articles");
    }
  }else{ //NULL
    res.redirect("/admin/articles");
  }
});

module.exports = router;