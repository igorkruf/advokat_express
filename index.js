import myData from "./myData.js";

import express from "express";
let app = express();
//Определим корневую папку
import __dirname from "./__dirname.js";
console.log(__dirname);
app.use(express.static(`${__dirname}/public/`));
//////////////////////////////////////////////////
//Подключаем шаблонизатор
import expressHandlebars from "express-handlebars";
const handlebars = expressHandlebars.create({
  defaultLayout: "main",
  extname: "hbs",
  // helpers: myHelpers,
});
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
///////////////////////////////////////////////////////
app.get("/", function (req, res) {
  res.render("index", {
    listemployees: myData.listemployees,
    services: myData.services,
    faqs: myData.faqs,
  });
});
app.get("/page/", function (req, res) {
  res.render("page", { text: "<b>aaa</b>" });
});
app.use(function (req, res) {
  res.status(404).send("not found");
});
app.listen(3000, function () {
  console.log("running");
});
