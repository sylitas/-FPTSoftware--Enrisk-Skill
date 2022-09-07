import express from "express";
import bodyParser from "body-parser";
import { closeDatabase, openDatabase } from "./sqlite3.js";
import getBookInformation from "./src/get.js";
import insertBookInformation from "./src/post.js";
import deleteBookInformation from "./src/delete.js";
import updateBookInformation from "./src/update.js";

const app = express();
const jsonParser = bodyParser.json();

//Open database
const db = openDatabase();

// Handle case main screen
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Query all books with pagination mechanism
app.get("/books", async (req, res, next) => {
  const result = await getBookInformation(db, req);
  res.status(200).json(result);
});

//Insert a book
app.post("/books", jsonParser, async (req, res, next) => {
  const result = await insertBookInformation(db, req);
  if (result.error)
    return res
      .status(result.error.status)
      .json({ message: result.error.message });
  return res.status(200).json(result);
});

//Delete a book
app.delete("/books", jsonParser, async (req, res, next) => {
  const result = await deleteBookInformation(db, req);
  if (result.error)
    return res
      .status(result.error.status)
      .json({ message: result.error.message });
  return res.status(200).json(result);
});

//Update a book
app.put("/books", jsonParser, async (req, res, next) => {
  const result = await updateBookInformation(db, req);
  if (result.error)
    return res
      .status(result.error.status)
      .json({ message: result.error.message });
  return res.status(200).json(result);
});

//Close database
app.use((req, res, next) => {
  closeDatabase(db);
  next();
});
// Handle case wrong endpoint
app.use((req, res) => {
  return res.status(404).send("Page not found !");
});

const post = 3000;
console.log(`Application is running at: http://localhost:${post}`);
app.listen(post);
