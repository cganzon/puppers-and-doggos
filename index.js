const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const axios = require("axios");

app.set("view engine", "ejs");
app.set("path", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Gets random images/gifs and displays on the home route
app.get("/", async (req, res) => {
  await axios
    .get("https://api.thedogapi.com/v1/images/search?limit=50&order=RANDOM&mime_types=jpg,png")
    .then((response) => {
      // console.log(response.data);
      let results = response.data;
      res.render("home", { results });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Displays all breed names
app.get("/breeds", async (req, res) => {
  await axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((response) => {
      // console.log(response.data);
      let results = response.data;
      res.render("breeds", { results });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Displays info on a selected breed
app.get("/breeds/:id", async (req, res) => {
  const { id } = req.params;
  await axios
    .get(`https://api.thedogapi.com/v1/images/search?breed_id=${id}`)
    .then((response) => {
      // console.log(response.data);
      let breedInfo = response.data;
      let breedDetails = response.data[0].breeds[0];
      res.render("breedInfo", { breedInfo, breedDetails });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Search results for a breed query
app.get("/search", async (req, res) => {
  let { search } = req.query;
  await axios
    .get(`https://api.thedogapi.com/v1/breeds/search?q=${search}`)
    .then((response) => {
      // console.log(response.data);
      let results = response.data;
      res.render("search", { results });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
