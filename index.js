const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const path = require("path");
const axios = require("axios");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '/public')));

// Searches for random images
app.get("/", (req, res) => {
  axios
    .get("https://api.thedogapi.com/v1/images/search?limit=5")
    .then((response) => {
      console.log(response.data);
      let results = response.data;
      res.render("home",  { results });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/breeds", (req, res) => {
  axios
    .get('https://api.thedogapi.com/v1/breeds')
    .then((response) => {
      console.log(response.data);
      let results = response.data;
      res.render("breeds",  { results });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});