const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const router = express.Router();

const pool = require("./../database");

app.use(express.json());
app.use(bodyParser.json());

//==== Return All reviews
app.get("/", (req, res) => {
  let mysql = "SELECT * FROM review";
  let query = pool.query(mysql, (error, results) => {
    if (error) {
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

//==== Add a new review
app.post("/", (req, res) => {
  let data = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    meal_id: req.body.meal_id,
    stars: req.body.stars,
    created_date: req.body.created_date
  };
  let mysql = "INSERT INTO review SET ?";
  let query = pool.query(mysql, data, (error, results) => {
    if (error) {
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

//==== Returns review by id
app.get("/:id", (req, res) => {
  let mysql = "SELECT * FROM review WHERE id=" + req.params.id;
  let query = pool.query(mysql, (error, results) => {
    if (error) {
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

//==== Updates the review by id
app.put("/:id", (req, res) => {
  pool.query(
    "UPDATE review SET `title` = ?, `description` = ?, `meal_id` = ?, `stars` = ?, `created_date` = ? WHERE `id`= ?",
    [
      req.body.title,
      req.body.description,
      req.body.meal_id,
      req.body.stars,
      req.body.created_date,
      req.body.id
    ],
    (error, results, fields) => {
      if (error) {
        res.send(JSON.stringify({ status: 500, error: error, response: null }));
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.send(
          JSON.stringify({ status: 200, error: null, response: results })
        );
        //If there is no error, all is good and response is 200OK.
      }
    }
  );
});

//==== Deletes the review by id
app.delete("/:id", (req, res) => {
  let mysql = "DELETE FROM review WHERE id=" + req.params.id + "";
  let query = pool.query(mysql, (error, results) => {
    if (error) {
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

module.exports = app;
