const { db, dbquery } = require("../database");
const { Property } = require("../lib/sequelize");

module.exports = {
  addProperty: async (req, res) => {
    try {
      console.log(req.body);
      console.log("uploader foto " + req.file);
      const {
        name,
        description,
        picture,
        tenantId,
        categoryId,
        rules,
      } = req.body;

      const filePath = "post";
      const { filename } = req.file;

      const neWProperty = await Property.create({
        name,
        description,
        picture: `${filePath}/${filename}`,
        tenantId,
        categoryId,
        rules,
      });

      return res.status(200).json({
        message: "success add data",
        results: neWProperty,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
  editProperty: async (req, res) => {
    const id = req.body.id;

    try {
      await Property.update(req.body, {
        where: { id },
        returning: true,
        plain: true,
      });
      const property = await Property.findByPk(id);

      return res.status(200).send({
        result: property,
        message: "success update property",
        code: 200,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
};
