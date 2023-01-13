const {db, dbquery} = require("../database");
const {sequelize, Property, Room, Tenant, User, Category, SpecialPrice} = require('../models')
const fs = require("fs");
const {Op} = require("sequelize");

const wrapper = async (req, res, func) => {
  try {
    const {result, message} = await func()
    return res.status(200).json({
      result: result,
      message: message,
      code: 200
    })
  } catch (err) {
    return res.status(500).json({
      message: err.toString(),
      code: 500
    })
  }
}

module.exports = {
  addProperty: async (req, res) => {
    try {
      // console.log(req.body);
      // console.log("uploader foto " + req.file);
      const {name, description, pic, tenantId, categoryId, rules} = req.body;

      const filePath = "property";
      const {filename} = req.file;

      const neWProperty = await Property.create({
        name,
        description,
        pic: `/${filePath}/${filename}`,
        tenantId,
        categoryId,
        rules,
      });

      return res.status(200).json({
        message: "success add data",
        results: neWProperty,
      });
    } catch (err) {
      // console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  editProperty: async (req, res) => {
    // console.log(req.body);
    const {id, old_img, description, rules, categoryId, name, pic} = req.body;
    const filePath = "property";
    // console.log(req.body);
    let editData = {};
    if (req.file?.filename) {
      const {filename} = req.file;
      // console.log(filename);

      if (old_img != undefined) {
        const path = `${__dirname}/../public/${old_img}`;
        // console.log(path);
        //remove file di profile_images ==> jika ada
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

      editData = {
        name,
        description,
        rules,
        categoryId,
        pic: `/${filePath}/${filename}`,
      };
    } else {
      editData = {
        name,
        description,
        rules,
        categoryId,
      };
    }

    try {
      await Property.update(
        {...editData},
        {
          where: {id},
        }
      );
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }

    return res.status(200).json({
      message: "success edit data property1111",
      results: editData,
    });
  },

  getSearchResult: async (req, res) => {
    return await wrapper(req, res, async () => {
      const ITEM_PER_PAGE = 2

      const {priceOrder, nameOrder, propLocation, propName} = req.query
      const propCapacity = req.query.visitor || 1

      const whereConditions = []
      if (propLocation) whereConditions.push({categoryId: propLocation})
      if (propName) whereConditions.push({name: {[Op.like]: `%${propName}%`}})

      let result = await Property.findAll({
        include: [
          {
            model: Category,
            required: true,
          },
          {
            model: Room,
            required: true,
            include: [{
              model: SpecialPrice,
              include: [{
                model: Room
              }]
            }]
          }
        ],
        where: whereConditions
      })

      result = result.filter(property => property.maxCapacity >= parseInt(propCapacity))

      const priceSortMultiplier = priceOrder === 'DESC' ? -1 : 1
      const nameSortMultiplier = nameOrder === 'DESC' ? -1 : 1

      result.sort((a, b) => {
        if (a.price < b.price) return -1 * priceSortMultiplier
        if (b.price < a.price) return 1 * priceSortMultiplier

        if (a.name < b.name) return -1 * nameSortMultiplier
        if (b.name < a.name) return 1 * nameSortMultiplier
      })

      const totalRows = result.length
      const totalPage = Math.ceil(result.length / ITEM_PER_PAGE)

      // const page = parseInt(req.query.page) || 0;
      const page = parseInt(req.query.page) < totalPage ? parseInt(req.query.page) || 0 : totalPage - 1;
      const limit = (page + 1) * ITEM_PER_PAGE;
      const offset = page * ITEM_PER_PAGE;
      result = result.slice(offset, limit)

      return {
        result: {properties: result, page, limit, totalRows, totalPage},
        message: 'success get properties'
      }
    })
  },

  getAll: async (req, res) => {
    return await wrapper(req, res, async () => {
      const {uid} = req.query
      const result = await Property.findAll({
        include: [{
          model: Tenant,
          required: true,
          include: [{
            model: User,
            required: true,
            where: {id: uid}
          }]
        }]
      })

      return {
        result: result,
        message: 'success get property'
      }
    })
  },

  getPropertyFilter: async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const alfabet = req.query.alfabet || "ASC";
    const time = req.query.time || "ASC";
    const offset = limit * page;
    const tenantId = req.params.tenantId;

    try {
      const result = await Property.findAndCountAll({
        where: {
          tenantId,
          name: {[Op.like]: "%" + search + "%"},
        },

        order: [
          ["name", `${alfabet}`],
          ["updatedAt", `${time}`],
        ],
        offset: offset,
        limit: limit,
      });
      const totalRows = result.count;
      const totalPage = Math.ceil(totalRows / limit);

      res.send({
        result,
        page,
        limit,
        totalRows,
        totalPage,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  getOneProperty: async (req, res) => {
    const id = req.params.propertyId;
    try {
      const results = await Property.findOne({
        where: {
          id,
        },
      });
      // console.log(results);
      return res.send(results);
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  deleteProperty: async (req, res) => {
    const {id, old_img} = req.body;

    await Property.destroy({
      include: [
        {
          model: Room,
        },
      ],
      where: {
        id,
      },
    });

    // console.log(old_img);

    const path = `${__dirname}/../public/${old_img}`;
    // console.log(path);

    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    return res.send("property deleted");
  },

  getSeeders: async (req, res) => {
    try {
      const seeders = await Category.findAll();

      return res.status(200).json({
        message: "Berhasil dapat lokasi",
        results: seeders,
      });
    } catch (err) {
      // console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
