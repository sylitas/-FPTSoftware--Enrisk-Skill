import { insertEachRow } from "../sqlite3.js";

const insertBookInformation = async (db, req) => {
  const { title, author, overview = "" } = req.body;
  if ([!title, !author, title === "", author === ""].includes(true))
    return { error: { status: 422, message: "Missing information" } };
  const id = insertEachRow(
    db,
    "book",
    ["title", "author", "overview"],
    [title, author, overview],
    true
  );
  return { id };
};
export default insertBookInformation;
