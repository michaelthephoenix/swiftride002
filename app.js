// password
//postgres

// calling dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;
// const {client} = require('pg');


mongoose.connect('mongodb+srv://nkonomic:postgres@cluster0.rbinvlb.mongodb.net/')
  .then(() => console.log('Connected!'));

const url = 'mongodb+srv://nkonomic:postgres@cluster0.rbinvlb.mongodb.net/';
MongoClient.connect(url, (err, client) => {
 if (err) throw err;
 console.log('connected to mongoDB');  
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});


const { Pool } = require('pg');

// Configure the connection parameters
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432, // Default port for PostgreSQL
});

// Connect to the PostgreSQL server
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log(result.rows);
  });
});

// Function to query the database
const queryDatabase = async (queryText) => {
    const client = await pool.connect();
    try {
        const result = await client.query(queryText);
        console.log(result.rows); // Output the query results
    } catch (err) {
        console.error(err);
    } finally {
        client.release(); // Release the client back to the pool
    }
};

// Example query
queryDatabase('SELECT * FROM your_table');
