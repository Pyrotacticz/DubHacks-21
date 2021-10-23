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

app.use(express.static('public'));
const PORT = process.env.PORT || HOST_NUMBER;
app.listen(PORT);
