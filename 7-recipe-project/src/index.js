//app to find all recipes, find one recipe, delet one recipe, update the name of one recipe

//import express modules and fs modules to read file system
// const express = require("express");
// const fs = require("fs").promises;

//for es6--this requires type="module" in package.json
import express from "express"; // external module that will allow us to build a web server
import fsPromises from "fs/promises"; // file system module that will allow us to read and write files

const app = express();

const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`My server is listening on port: ${port}`);
});

//Helper functions
//find all recipes
async function getAllRecipes() {
  const recipes = await fsPromises.readFile("../data/recipe-data.json", "utf8");
  let parsedRecipes = JSON.parse(recipes);
  console.log(parsedRecipes);
  return parsedRecipes;
}

async function getRecipe(id) {
  const recipe = await fsPromises.readFile("../data/recipe-data.json", "utf8");
  let parsedRecipe = JSON.parse(recipe);
  console.log(parsedRecipe);
  return parsedRecipe[id];
}

async function deleteRecipe(id) {
  const recipes = await fsPromises.readFile("../data/recipe-data.json", "utf8");
  let parsedRecipes = JSON.parse(recipes);
  // parsedRecipes.splice(id, 1);
  // const stringRecipes = JSON.stringify(parsedRecipes);
  // await fsPromises.writeFile("../data.recipes.json", stringRecipes, "utf8");
  delete parsedRecipes[id];
  await fsPromises.writeFile(
    "../data/recipe-data.json",
    JSON.stringify(parsedRecipes)
  );
}

async function updateRecipeName(id, newName) {
    console.log(id, newName);
  const recipes = await fsPromises.readFile("../data/recipe-data.json", "utf8");
  let parsedRecipes = JSON.parse(recipes);
  const recipeIndex = Number(id); //convert id to number
  parsedRecipes[recipeIndex].name = newName;
  await fsPromises.writeFile(
    "../data/recipe-data.json",
    JSON.stringify(parsedRecipes)
  );
}

//-----------------------
app.get("/get-all-recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  res.send(JSON.stringify(recipes));
});

app.get("/get-recipe/:id", async (req, res) => {
  const recipe = await getRecipe(req.params.id);
  res.send(JSON.stringify(recipe));
});

app.get("/delete-recipe/:id", async (req, res) => {
  await deleteRecipe(req.params.id);
  res.send("Recipe deleted");
});

app.get("/update-recipe/:id/:newRecipeName", async (req, res) => {
  const { id, newRecipeName } = req.params;
  await updateRecipeName(id, newRecipeName);
  res.send("Recipe Name updated");
});
