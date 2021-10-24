'use strict';
const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

const CLIENT_ERROR = 400;
const SERVER_ERROR = 500;
const HOST_NUMBER = 8080;

// Endpoints

/**
 * Establishes a database connection to the wpl database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @returns {Object} - The database object for the connection.
 */
 async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'medical_centers.db',
    driver: sqlite3.Database
  });
  return db;
}

app.use("/", express.static('public'));
const PORT = process.env.PORT || HOST_NUMBER;
app.listen(PORT, () => { console.log('FastCare running on ' + PORT + '...')});

// @req - represents any data with the request
// @res - used for sending a response back to the browser
app.get("/test-sites", (req, res) => {
  res.send("TODO: List Test sites or Clinical centers");
  var rows = readTable("wi_clinics");
});

// catch 404, forward to error handler
app.use(function(req, res, next) {
  next(createError(CLIENT_ERROR));
});


// read from the db
function readTable (table) {
  let sql = `SELECT * FROM ${table}`;
  let data = {};
  var db = new sqlite3.Database('medical_centers.db', (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to sqlite3 database.')
  });

  // return all results of query
  db.all(sql, [], (err, rows) => {
    if (err) throw(err);
    rows.forEach((row) =>  {
      // TODO: LIST IN FRONTEND
      console.log(`${row.name} - Address: ${row.address} - Phone number: ${row.phone} - Hours: ${row.hours}`);
    });
    return rows;
  });

  db.close();
}

// TODO filter table


// required for updateRows
var schema = {
  "wi_clinics": [
    "name", "address", "phone", "hour"],
  "test_sites": [
    "name", "address", "phone", "hour"]
}

//TODO: createRow, updateRow, deleteRow (API For CLINICS AND HOSPITALS)