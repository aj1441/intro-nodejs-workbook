//Importing modules

// const express = require('express'); //external module for using express
// const Client = require('pg') //external module for using postgres with node
// const config = require('./config.js'); // internal module for connecting to our config file

import express from "express";
import pg from "pg";
const { Client } = pg;
import config from "./config.js";

const app = express();
const port = 3000;

//boilerplate code for express
app.use(express.json());

const client = new Client(config); //creating our database Client with our config values

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//helper functions
async function getAllLanguages() {
  const client = new Client(config); //creating our database Client with our config values

  await client.connect(); //connecting to our database
  let result = await client.query("SELECT * FROM programming_languages");
  console.log(result.rows);
  await client.end(); //ending the connection to our database
  return result.rows;
}

async function allLanguagesByYear() {
  const client = new Client(config); //creating our database Client with our config values
  await client.connect(); //connecting to our database
  let result = await client.query(
    "SELECT * FROM programming_languages ORDER BY released_year"
  );
  console.log(result.rows);
  await client.end(); //ending the connection to our database
  return result.rows;
}

async function getAllLanguagesSortedByColumn(column) {
  const client = new Client(config); //creating our database Client with our config values
  await client.connect(); //connecting to our database
  //validate columns to prevent SQL injection
  const validColumns = [
    "name",
    "released_year",
    "githut_rank",
    "pypl_rank",
    "tiobe_rank",
  ];
  // Dynamically construct the query with the validated column name
  const query = `SELECT * FROM programming_languages ORDER BY ${column} ASC`;
  const result = await client.query(query); // Execute the query
  console.log(result.rows);
  await client.end(); //ending the connection to our database
  return result.rows;
}

async function getOneLanguage(id) {
  const client = new Client(config); //creating our database Client with our config values

  await client.connect();
  //1. Add a variable into our SWL query
  let result = await client.query(
    `SELECT * FROM programming_languages WHERE id = '${id}'`
  );
  //2. PG library has a way to pass in variable values as an array
  //   let text =`SELECT * FROM programming_languages WHERE id = $1`;
  //   let values = [id];
  //   let result = await client.query(text, values);
  console.log(result.rows);
  await client.end();
  return result.rows;
}

async function searchLanguagesByName(name) {
  const client = new Client(config); //creating our database Client with our config values
  await client.connect();
  //1. Add a variable into our SWL query
  let query = `SELECT * FROM programming_languages WHERE name ILIKE $1`; // ILIKE covers case sensitive and wildcards
  let values = [`%${name}%`];
  const result = await client.query(query, values);
  console.log(result.rows);
  await client.end();
  return result.rows;
}

async function addOneLanguage(obj) {
  console.log(obj);
  const client = new Client(config); //creating our database Client with our config values
  await client.connect(); // connecting to our database
  await client.query(
    `INSERT INTO programming_languages (id, name, released_year, githut_rank, pypl_rank, tiobe_rank) VALUES ('${obj.name}', '${obj.description}', '${obj.released_year}', '${obj.githut_rank}', '${obj.pypl_rank}', '${obj.tiobe_rank}')`
  );
  let result;
}

//API endpoint
// get all languages
app.get("/get-all-languages", async (req, res) => {
  let languages = await getAllLanguages();
  let JSONlanguages = JSON.stringify(languages);
  res.send(JSONlanguages);
});

// get one language
app.get("/get-one-language/:id", async (req, res) => {
  let selectedLanguage = await getOneLanguage(req.params.id);
  let JSONselectedLanguage = JSON.stringify(selectedLanguage);
  res.send(JSONselectedLanguage);
});

//add one language
app.post("/add-one-language", async (req, res) => {
  await addOneLanguage(req.body);
  res.send("added language");
});

//all languages sorted by year
app.get("/get-all-languages/sort-by-year", async (req, res) => {
  let languages = await allLanguagesByYear();
  let JSONlanguages = JSON.stringify(languages);
  res.send(JSONlanguages);
});

//all languages sorted by column
app.get("/get-all-languages/sort-by/:column", async (req, res) => {
  res.json(languages); // Automatically format the response as JSON
  let languages = await getAllLanguagesSortedByColumn(req.params.column);
  // let JSONlanguages = JSON.stringify(languages);
  // res.send(JSONlanguages);
});

///search-languages-by-name/:name serch languages by name
app.get("/search-languages-by-name/:name", async (req, res) => {
  let languages = await searchLanguagesByName(req.params.name);
  res.json(languages);
});

//___________________________________
