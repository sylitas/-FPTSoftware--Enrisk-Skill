const updateBookInformation = async (db, req) => {
  const { id, title, author, overview = "" } = req.body;
  if (
    [!id, !title, !author, id === "", title === "", author === ""].includes(
      true
    )
  )
    return { error: { status: 422, message: "Missing information" } };
  const isHaveRecord = (
    await new Promise((resolve) => {
      db.all(`SELECT * FROM book WHERE id = (?)`, [id], (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    })
  ).length;
  if (isHaveRecord) {
    db.run(
      `UPDATE book SET title=(?), author=(?), overview=(?) WHERE id=(?)`,
      [title, author, overview, id],
      (err) => {
        if (err) return console.error(err);
      }
    );
    return { message: "Updated!" };
  }
  return { error: { status: 400, message: "Not found id!" } };
};
export default updateBookInformation;
