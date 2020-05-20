const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const router = express.Router();

const pool = require("./../database");

app.use(express.json());
app.use(bodyParser.json());

//==== Return All reservations
app.get("/", (req, res) => {
  let mysql = "SELECT * FROM reservation";
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

//==== Add a new reservation
app.post("/", (req, res) => {
  let data = {
    id: req.body.id,
    number_of_guests: req.body.number_of_guests,
    meal_id: req.body.meal_id,
    created_date: req.body.created_date,
  };
  let mysql = "INSERT INTO reservation SET ?";
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

//==== Returns reservation by id
app.get("/:id", (req, res) => {
  let mysql = "SELECT * FROM reservation WHERE id=" + req.params.id;
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

//==== Updates the reservation by id
app.put("/:id", (req, res) => {
  pool.query(
    "UPDATE reservation SET `number_of_guests` = ?, `meal_id` = ?, `created_date` = ? WHERE `id`= ?",
    [
      req.body.number_of_guests,
      req.body.meal_id,
      req.body.created_date,
      req.body.id,
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

//==== Deletes the reservation by id
app.delete("/:id", (req, res) => {
  let mysql = "DELETE FROM reservation WHERE id=" + req.params.id + "";
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
