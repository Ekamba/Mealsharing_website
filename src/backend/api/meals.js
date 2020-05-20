const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const pool = require("./../database");
const Joi = require("joi");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//==== Return All meals
app.get("/", (req, res) => {
  let mysql = "SELECT * FROM meal";
  let query = pool.query(mysql, (error, results, fields) => {
    //If there is error, we send the error in the error section with 500 status
    if (error) throw error;
    res.send(results);
  });
});

//==== Add a new meal
app.post("/", (req, res) => {
  const schema = {
    meal: Joi.string()
      .min(2)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error);
  }
  let data = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    when: req.body.when,
    max_reservation: req.body.max_reservations,
    price: req.body.price,
    create_date: req.body.create_date
  };

  const meal = req.body;
  console.log("meal:", meal);
  pool.query("INSERT into meal SET ?", meal, (error, results, fields) => {
    //If there is error, we send the error in the error section with 500 status
    if (error) throw error;
    res.send(results);
  });
});
//==== Returns meal by id
app.get("/:id", (req, res) => {
  let mysql = "SELECT * FROM meal WHERE meal.id=" + req.params.id;
  let query = pool.query(mysql, (error, results, fields) => {
    //If there is error, we send the error in the error section with 500 status
    if (error) throw error;
    res.send(results);
  });
});

//==== Updates the meal by id

app.put("/:id", (req, res) => {
  pool.query(
    "UPDATE meal SET `title` = ?, `description` = ?, `location` = ?, `when` = ?, `max_reservations` = ?, `price` = ?, `created_date` = ? WHERE `id`= ?",
    [
      req.body.title,
      req.body.description,
      req.body.location,
      req.body.when,
      req.body.max_reservations,
      req.body.price,
      req.body.created_date,
      req.body.id
    ],
    (error, results, fields) => {
      //If there is error, we send the error in the error section with 500 status
      if (error) throw error;
      res.send(results);
    }
  );
});

//==== Deletes the meal by id

app.delete("/:id", (req, res) => {
  let mysql = "DELETE FROM meal WHERE id=" + req.params.id + "";
  let query = pool.query(mysql, (error, results) => {
    //If there is error, we send the error in the error section with 500 status
    if (error) throw error;
    res.send(results);
  });
});

module.exports = app;
