const { Property, reservation } = require("../models");

module.exports = {
  getOrder: async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const alfabet = req.query.alfabet || "ASC";
    const time = req.query.time || "ASC";
    const offset = limit * page;
    const tenantId = req.params.tenantId;
    try {
      getReportOrder = await reservation.findAndCountAll({
        include: [
          {
            model: Room,
            required: false,
            include: [
              {
                model: Property,
                required: false,
                where: {
                  tenantId,
                },
              },
            ],
          },
        ],
      });
      const totalRows = getReportOrder.count;
      const totalPage = Math.ceil(totalRows / limit);
      return res.status(200).json({
        message: "Berhasil",
        result: getReportOrder,
        totalRows,
        totalPage,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
