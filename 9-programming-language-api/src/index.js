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
  await client.connect(); //connecting to our database
  let result = await client.query("SELECT * FROM programming_languages");
  console.log(result.rows);

  await client.end(); //ending the connection to our database
}

async function getOneLanguage(id) {
  await client.connect();
  let result = await client.query(
    `SELECT * FROM programming_languages WHERE id = ${id}`
  );
  console.log(result.rows);
  await client.end();
}

//API endpoint
app.get("/get-all-languages", async (req, res) => {
  let languages = await getAllLanguages();
  let JSONlanguages = JSON.stringify(languages);
  res.send(JSONlanguages);
});

app.get("/get-one-language/:id", async (req, res) => {
  let selectedLanguage = await getOneLanguage(req.params.id);
  let JSONselectedLanguage = JSON.stringify(selectedLanguage);
  res.send(JSONselectedLanguage);
});

//___________________________________
