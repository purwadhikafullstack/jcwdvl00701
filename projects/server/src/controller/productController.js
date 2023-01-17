const { db, dbquery } = require("../database");
const {
  Property,
  Room,
  Tenant,
  SpecialPrice,
  RoomUnavailability,
  User,
  Profile,
  Category,
  Reservation,
  Review,
} = require("../models");

module.exports = {
  getProductDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const getProperty = await Property.findOne({
        where: {
          id,
        },

        include: [
          {
            model: Category,
            requred: true,
            attributes: ["location"],
          },
          {
            model: Room,
            required: false,
            attributes: ["id", "name", "defaultPrice"],
            order: ["defaultPrice", "DESC"],
          },
          {
            model: Tenant,
            required: false,
            attributes: ["name", "createdAt"],
            include: [
              {
                model: User,
                required: false,
                attributes: ["id"],
                include: [
                  {
                    model: Profile,
                    required: false,
                    attributes: ["profilePic"],
                  },
                ],
              },
            ],
          },
        ],
      });
      return res.status(200).json({
        message: "Berhasil",
        results: getProperty,
      });
    } catch (err) {
      //console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  getRoom: async (req, res) => {
    try {
      const { id } = req.params;

      const getRoom = await Room.findAll({
        where: {
          id,
        },
        include: [
          {
            model: RoomUnavailability,
            required: false,
            attributes: ["id", "startDate", "endDate", "roomId"],
          },
          {
            model: SpecialPrice,
            required: false,
            attributes: [
              "id",
              "startDate",
              "endDate",
              "roomId",
              "type",
              "discount",
            ],
          },
        ],
      });
      // console.log("TESSSS");
      // console.log(getRoom[0].SpecialPrices[0].type);

      // let price = getRoom[0].SpecialPrice.map((val) => {
      //   if (val.type === "nominal") {
      //     return val.discount;
      //   } else if (val.type === "persen") {
      //     price = getRoom.defaultPrice * (100 + getRoom.SpecialPrice.discount);
      //   }
      // });

      return res.status(200).send({
        message: "Berhasil",
        results: getRoom,
        // price,
      });
    } catch (err) {
      //console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  getReview: async (req, res) => {
    try {
      //console.log(req.query);
      const { id } = req.params;
      let show = req.query.show || "close";

      let a;
      if (show === "show") {
        a = null;
      } else {
        a = 1;
      }

      const getReview = await Property.findOne({
        where: {
          id,
        },
        attributes: ["id"],
        required: true,
        include: [
          {
            model: Room,
            required: false,
            attributes: ["id", "name"],
            include: [
              {
                model: Reservation,
                required: true,
                attributes: ["id"],
                order: ["id", "DESC"],
                include: [
                  {
                    model: Review,
                    required: true,
                    attributes: ["id", "comment", "createdAt"],
                  },
                  {
                    model: User,
                    required: true,
                    attributes: ["id"],
                    include: [
                      {
                        model: Profile,
                        required: true,
                        attributes: ["name", "profilePic"],
                      },
                    ],
                  },
                ],
              },
            ],

            limit: a,
          },
        ],
      });
      return res.status(200).json({
        message: "Berhasil",
        results: getReview,
      });
    } catch (err) {
      //console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
