import { uuid } from "uuidv4";
import sqlite3 from "sqlite3";
import sampleData from "./database/sample_data.json" assert { type: "json" };

export const insertEachRow = (
  db,
  tableName,
  columns,
  items,
  isGetId = false
) => {
  const id = uuid();
  const values = items.map((el) => "?").join();
  const query = `INSERT INTO ${tableName}(id,${columns.join()}) VALUES(?,${values})`;
  const params = [query, [id, ...items]];
  console.log("insert - params", params);

  db.run(...params, (err) => {
    if (err) return console.log(err.message);
    console.log(`A row has been inserted with id ${id}`);
  });
  if (isGetId) return id;
  return;
};

export const openDatabase = () => {
  const verbose = sqlite3.verbose();
  const db = new verbose.Database("./database/bookCollection.db", (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to the bookCollection.db SQlite database.");
  });

  //Insert some sample data
  //Please do not uncomment this function if you DB does not need sample information
  // * --------------- Create Table ---------------
  // db.run(
  //   `CREATE TABLE book (
  //   id TEXT PRIMARY KEY,
  //   title TEXT NOT NULL,
  //   author TEXT NOT NULL,
  //   overview TEXT DEFAULT ""
  //   );`,
  //   (err) => {
  //     if (err) console.log("Some Error Occurred");
  //     console.log("Table Created");
  //   }
  // );
  // * ---------------Insert Some Sample Data ---------------
  // const bookInformation = sampleData;
  // const data = Object.keys(bookInformation).reduce((el, bookTitle) => {
  //   el.push([
  //     bookTitle,
  //     bookInformation[bookTitle].author,
  //     bookInformation[bookTitle].overview,
  //   ]);
  //   return el;
  // }, []);
  // for (let i = 0; i < data.length; i++) {
  //   insertEachRow(db, "book", ["title", "author", "overview"], data[i]);
  // }
  // * --------------- Drop Table ---------------
  // db.run(`DROP TABLE book ;`, (err) => {
  //   if (err) console.log("Some Error Occurred");
  //   console.log("Table Dropped!");
  // });

  return db;
};

export const closeDatabase = (db) => {
  return db.close((err) => {
    if (err) return console.error(err.message);
    console.log("Close the database connection.");
  });
};
