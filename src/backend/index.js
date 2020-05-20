const express = require("express");
const app = express();

const mealRouter = require("./route/mealRouter");
const meals = require("./api/meals");
const reviews = require("./api/reviews");
const reservations = require("./api/reservations");
const router = express.Router();

const port = process.env.PORT || 3000;
// For week4 no need to look into this!
const path = require("path");
// Serve the built client html
const buildPath = path.join(__dirname, "../../dist");
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.static("public"));

// create a route for the app
app.use("/route/mealRouter", mealRouter);
app.use("/api/meals", meals);
app.use("/api/reservations", reservations);
app.use("/api/reviews", reviews);

app.use("/api", router);

// For week4 no need to look into this!
// Ensures that the client router works on reload aswell.
// Sends all requests back to index.html where the routing lib takes over
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./../../dist/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
// make the server listen to requests
app.listen(port, () =>
  console.log(`Server started at port ${port} for Meal-sharing App!`)
);
