const {
  Property,
  Reservation,
  User,
  Profile,
  Room,
  Transaction,
} = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getOrder: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.searchQuery || "";
      const alfabet = req.query.alfabet || "ASC";
      const time = req.query.time || "ASC";
      const offset = limit * page;
      const tenantId = req.params.tenantId;
      console.log(alfabet);
      console.log(req.query.status);

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

      console.log(whereConditionStatus);
      getReportOrder = await Reservation.findAndCountAll({
        include: [
          {
            model: Room,
            required: true,
            attributes: ["id", "name"],
            where: whereCondition,
            order: [["name", `${alfabet}`]],
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

        order: [["updatedAt", `${time}`]],
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
};
