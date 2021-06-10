const express = require("express");
const app = express();
const connection = require("./database/database");

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso!");
  }).catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("O servidor está rodando!");
});