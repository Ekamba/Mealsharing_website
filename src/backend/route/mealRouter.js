const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const pool = require("./../database");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get("/", (req, res) => {
  console.log(req.query);
  const { maxPrice } = req.query;
  const { availableReservations } = req.query;
  const { title } = req.query;
  const { createdAfter } = req.query;
  const { limit } = req.query;

  //==== Get meals that has a price smaller than maxPrice
  if (maxPrice) {
    pool.query(
      `SELECT * FROM meal WHERE price < ${maxPrice}`,
      (error, results, fields) => {
        //If there is error, we send the error in the error section with 500 status
        if (error) {
          res.send(
            JSON.stringify({ status: 500, error: error, response: null })
          );
          //If there is no error, all is good and response is 200OK.
        } else {
          res.send(
            JSON.stringify({ status: 200, error: null, response: results })
          );
        }
      }
    );
  }

  //==== Get meals that still has available reservations
  else if (availableReservations) {
    pool.query(
      `SELECT meal.id, total_reservations, max_reservations from meal inner join
      (select SUM(reservation.number_of_guests) total_reservations, meal_id from reservation group by reservation.meal_id) res
        on meal.id = meal_id AND meal.max_reservations > res.total_reservations;`,
      function(error, results, fields) {
        //If there is error, we send the error in the error section with 500 status
        if (error) {
          res.send(
            JSON.stringify({ status: 500, error: error, response: null })
          );
          //If there is no error, all is good and response is 200OK.
        } else {
          res.send(
            JSON.stringify({ status: 200, error: null, response: results })
          );
        }
      }
    );
  }
  //===== Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde
  else if (title) {
    pool.query(
      `SELECT title,
      description
      FROM Meal
      WHERE description 
      regexp 'Tag|Cav|Cas'`,
      function(error, results, fields) {
        //If there is error, we send the error in the error section with 500 status
        if (error) {
          res.send(
            JSON.stringify({ status: 500, error: error, response: null })
          );
          //If there is no error, all is good and response is 200OK.
        } else {
          res.send(
            JSON.stringify({ status: 200, error: null, response: results })
          );
        }
      }
    );
  }

  //==== Get meals that has been created after the date
  else if (createdAfter) {
    pool.query(
      `SELECT * FROM meal WHERE created_date > '${createdAfter}'`,
      function(error, results, fields) {
        //If there is error, we send the error in the error section with 500 status
        if (error) {
          res.send(
            JSON.stringify({ status: 500, error: error, response: null })
          );
          //If there is no error, all is good and response is 200OK.
        } else {
          res.send(
            JSON.stringify({ status: 200, error: null, response: results })
          );
        }
      }
    );
  }

  //==== Only specific number of meals
  else if (limit) {
    pool.query(
      `SELECT meal.id,
          meal.title
          FROM Meal
          LIMIT ${limit}`,
      (error, results, fields) => {
        //If there is error, we send the error in the error section with 500 status
        if (error) {
          res.send(
            JSON.stringify({ status: 500, error: error, response: null })
          );
          //If there is no error, all is good and response is 200OK.
        } else {
          res.send(
            JSON.stringify({ status: 200, error: null, response: results })
          );
        }
      }
    );
  }
});

module.exports = app;
