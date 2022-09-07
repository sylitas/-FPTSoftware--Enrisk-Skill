const generateQueryStatement = (
  page = 0,
  limit = 5,
  field = "id",
  order = "ASC"
) => {
  let query = `SELECT * FROM book ORDER BY ${field} ${order}`;
  if (limit) query = `${query} LIMIT ${limit}`;
  if (page) query = `${query} OFFSET ${page * limit}`;
  return query;
};

const getBookInformation = async (db, req) => {
  let {
    query: { page, pageSize: limit, keywords: field, order },
  } = req;

  if ([page === "", !/^[1-9]+$/.test(page)].includes(true)) page = undefined;
  if ([limit === "", !/^[1-9]+$/.test(limit)].includes(true)) limit = undefined;
  if (
    [
      field === "",
      ["id", "title", "author"].includes(field.toUpperCase()),
    ].includes(true)
  )
    field = undefined;
  if (
    [order === "", !["ASC", "DESC"].includes(order.toUpperCase())].includes(
      true
    )
  )
    order = undefined;

  const query = generateQueryStatement(page, limit, field, order);
  const result = new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });

  return result;
};

export default getBookInformation;
