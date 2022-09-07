const deleteBookInformation = async (db, req) => {
  const { id } = req.body;
  if (!id) return { error: { status: 422, message: "Missing id" } };
  const isHaveRecord = (
    await new Promise((resolve) => {
      db.all(`SELECT * FROM book WHERE id = (?)`, [id], (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    })
  ).length;
  if (isHaveRecord) {
    db.run(`DELETE FROM book WHERE id=(?)`, [id], (err) => {
      if (err) return console.error(err);
    });
    return { message: "Deleted!" };
  }
  return { error: { status: 400, message: "Not found id!" } };
};
export default deleteBookInformation;
