const {
  Property,
  Reservation,
  User,
  Profile,
  Room,
  Transaction,
} = require("../models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
module.exports = {
  getOrder: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.searchQuery || "";
      const alfabet = req.query.alfabet || "ASC";
      const time = req.query.time || "ASC";
      const offset = limit * page;
      const price = req.query.price || "ASC";
      const tenantId = req.params.tenantId;

      console.log("page");
      console.log(page);
      console.log("limit");
      console.log(limit);
      console.log("search");
      console.log(search);
      console.log("time");
      console.log(time);
      console.log("price");
      console.log(price);

      const whereCondition = {
        name: { [Op.like]: "%" + search + "%" },
      };

      if (req.query?.propertyId) {
        whereCondition.propertyId = req.query.propertyId;
      }
      let whereConditionStatus = {
        guestCount: { [Op.like]: "%%" },
      };

      if (req.query?.status > 0) {
        whereConditionStatus.status = req.query?.status;
      } else if (req.query?.status == null) {
        whereConditionStatus = { where: {} };
      }

      getReportOrder = await Reservation.findAndCountAll({
        include: [
          {
            model: Room,
            required: true,
            attributes: ["id", "name"],
            where: whereCondition,

            include: [
              {
                model: Property,
                attributes: ["id", "name", "pic"],
                required: false,
                where: {
                  tenantId,
                },
              },
            ],
          },
          {
            model: Transaction,
            required: false,
          },
          {
            model: User,
            attributes: ["id"],
            required: false,
            include: [
              {
                model: Profile,
                attributes: ["name"],
                required: false,
              },
            ],
          },
        ],
        where: whereConditionStatus,

        order: [
          [Room, "name", `${alfabet}`],
          ["finalPrice", `${price}`],
          ["endDate", `${time}`],
        ],
        offset: offset,
        limit: limit,
      });
      const totalRows = getReportOrder.count;
      const totalPage = Math.ceil(totalRows / limit);
      return res.status(200).json({
        message: "Berhasil",
        result: getReportOrder,
        totalRows,
        totalPage,
        page,
        limit,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const id = req.params.id;
      const status = parseInt(req.query.status);
      const result = await Reservation.update(
        {
          status,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.status(200).json({
        message: "Berhasil update",
        result,
      });
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  getSalesReport: async (req, res) => {
    try {
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const tenantId = req.params.tenantId;
      const search = req.query.search_query || "";
      const filter = req.query.filter;
      const statusFinished = 6;
      let propertyFilter = "";
      let userFilter = "";

      if (filter == "Property") {
        propertyFilter = search;
      } else if (filter == "User") {
        userFilter = search;
      }

      const whereCondition = {
        status: statusFinished,
      };

      if (req.query?.startDate) {
        whereCondition.startDate = {
          [Op.gt]: startDate,
        };
      }

      if (req.query?.endDate) {
        whereCondition.endDate = {
          [Op.lt]: endDate,
        };
      }
      const SalsesReport = await Reservation.findAll({
        include: [
          {
            model: Room,
            required: true,

            include: [
              {
                model: Property,
                required: true,
                where: {
                  tenantId,
                  name: { [Op.like]: "%" + propertyFilter + "%" },
                },
              },
            ],
          },
          {
            model: User,
            attributes: ["id"],
            required: true,
            include: [
              {
                model: Profile,
                attributes: ["name"],
                where: {
                  name: { [Op.like]: "%" + userFilter + "%" },
                },
                required: true,
              },
            ],
          },
        ],
        where: whereCondition,
      });
      res.status(200).json({
        result: SalsesReport,
        code: 200,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
