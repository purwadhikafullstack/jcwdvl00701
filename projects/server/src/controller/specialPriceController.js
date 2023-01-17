const {
  sequelize,
  SpecialPrice,
  Property,
  Room,
  Tenant,
  User,
} = require("../models");
const { Op } = require("sequelize");

const wrapper = async (req, res, func) => {
  try {
    const { result, message } = await func();
    return res.status(200).json({
      result: result,
      message: message,
      code: 200,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.toString(),
      code: 500,
    });
  }
};

module.exports = {
  add: async (req, res) => {
    return await wrapper(req, res, async () => {
      const { type, amount, startDate, endDate, selectedRooms } = req.body;

      const result = await sequelize.transaction(async (t) => {
        for (roomId of selectedRooms) {
          await SpecialPrice.create(
            {
              type: type,
              discount: amount,
              startDate: startDate,
              endDate: endDate,
              roomId: roomId,
            },
            { transaction: t }
          );
        }
      });

      // const result = {type: type, discount: amount, startDate: startDate, endDate: endDate, roomId: roomId}
      return {
        result: result,
        message: "success add special price",
      };
    });
  },

  getAll: async (req, res) => {
    return await wrapper(req, res, async () => {
      const { uid } = req.query;
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 5;
      const offset = limit * page;

      const startDate = req.query.startDate || "";
      const endDate = req.query.endDate || "";

      const whereDateCondition = [];
      if (startDate) {
        const normalizedStartDate = new Date(startDate).toDateString();
        whereDateCondition.push({
          startDate: {
            [Op.gte]: new Date(normalizedStartDate),
          },
        });
      }
      if (endDate) {
        const normalizedEndDate = new Date(endDate).toDateString();
        whereDateCondition.push({
          endDate: {
            [Op.lte]: new Date(normalizedEndDate),
          },
        });
      }

      const propertyId = req.query.propertyId;
      let wherePropertyCondition = {};
      if (propertyId) wherePropertyCondition.id = propertyId;

      const specialPrices = await SpecialPrice.findAll({
        include: [
          {
            model: Room,
            required: true,
            group: "propertyId",
            include: [
              {
                model: Property,
                required: true,
                include: [
                  {
                    model: Tenant,
                    required: true,
                    include: [
                      {
                        model: User,
                        required: true,
                        where: { id: uid },
                      },
                    ],
                  },
                ],
                where: wherePropertyCondition,
              },
            ],
          },
        ],
        where: whereDateCondition,
        order: [
          [{ model: Room }, { model: Property }, "id", "DESC"],
          ["updatedAt", "DESC"],
        ],
        offset: offset,
        limit: limit,
      });

      const totalRows = await SpecialPrice.count({
        include: [
          {
            model: Room,
            required: true,
            group: "propertyId",
            include: [
              {
                model: Property,
                required: true,
                include: [
                  {
                    model: Tenant,
                    required: true,
                    include: [
                      {
                        model: User,
                        required: true,
                        where: { id: uid },
                      },
                    ],
                  },
                ],
                where: wherePropertyCondition,
              },
            ],
          },
        ],
        where: whereDateCondition,
      });
      const totalPage = Math.ceil(totalRows / limit);

      return {
        result: { specialPrices, page, limit, totalRows, totalPage },
        message: "success get special prices",
      };
    });
  },

  get: async (req, res) => {
    return await wrapper(req, res, async () => {
      const { id } = req.query;
      const result = await SpecialPrice.findOne({
        where: { id: id },
        include: [
          {
            model: Room,
            required: true,
            include: [
              {
                model: Property,
                required: true,
                include: [
                  {
                    model: Tenant,
                    required: true,
                    include: [
                      {
                        model: User,
                        required: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      return {
        result: result,
        message: "success get special price",
      };
    });
  },

  update: async (req, res) => {
    return await wrapper(req, res, async () => {
      const { id, amount, startDate, endDate, type } = req.body;
      const normalizedStartDate = new Date(new Date(startDate).toDateString());
      const normalizedEndDate = new Date(new Date(endDate).toDateString());
      try {
        await sequelize.transaction(async (t) => {
          await SpecialPrice.update(
            {
              type: type,
              discount: amount,
              startDate: normalizedStartDate,
              endDate: normalizedEndDate,
            },
            { where: { id: id } },
            { transaction: t }
          );
        });
      } catch (err) {
        throw err;
      }

      const result = await SpecialPrice.findOne({
        where: { id: id },
        include: [
          {
            model: Room,
            required: true,
            include: [
              {
                model: Property,
                required: true,
                include: [
                  {
                    model: Tenant,
                    required: true,
                    include: [
                      {
                        model: User,
                        required: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      return {
        result: result,
        message: "success update special price",
      };
    });
  },

  delete: async (req, res) => {
    return await wrapper(req, res, async () => {
      const id = req.body.id;
      const result = await SpecialPrice.findOne({
        where: { id: id },
        include: [
          {
            model: Room,
            required: true,
            include: [
              {
                model: Property,
                required: true,
                include: [
                  {
                    model: Tenant,
                    required: true,
                    include: [
                      {
                        model: User,
                        required: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      await sequelize.transaction(async (t) => {
        await SpecialPrice.destroy(
          {
            where: { id: id },
          },
          { transaction: t }
        );
      });

      return {
        result: result,
        message: "success delete special price",
      };
    });
  },
};
