const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rajat Malik",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rajat Malik",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Rajat Malik",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error)
        res.send({
          error,
        });
      if (location) {
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) res.send({ error });
          if (forecastData) {
            res.send({
              location,
              forecast: forecastData,
              address: req.query.address,
            });
          }
        });
      }
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rajat Malik",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rajat Malik",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
