const { db, dbquery } = require("../database");

module.exports = {
  getProductDetail: async (req, res) => {
    const { id } = req.params;
    let sqlGet = `SELECT p.name as nameProperty, p.pic, p.rules, p.id, p.description, 
    r.defaultPrice, r.description as roomDes, r.name as roomName, r.capacity,
    t.name as tenantName, t.createdAt,
    c.location,
    s.type, s.discount, s.startDate, s.endDate,
    ru.startDate, ru.endDate
    from properties p 
    join rooms r on p.id = r.propertyId 
    join tenants t on t.id = p.tenantId 
    join categories c on c.id = p.categoryId
    left join specialprices s on s.roomId = r.id
    left join roomunavailabilities ru on ru.roomId = r.id where p.id = ${db.escape(
      id
    )};`;

    db.query(sqlGet, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  },
};
