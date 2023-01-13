const {
  sequelize,
  RoomUnavailability,
  User,
  Profile,
  UserRole,
  Tenant,
  Reservation,
  Room,
  Property,
} = require("../models");
const reservation = require("../models/reservation");

module.exports = {
  getReservation: async (req, res) => {
    // dpt dari id use params sesuai room yg di klik nya ==> utk di code front-end
    const id = req.query.id;
    // const startDate = req.query.startDate
    console.log(id);
    // console.log(startDate);
    try {
      const reservation = await Reservation.findOne({
        where: {
          id: id,
          // startDate : startDate
        },
        include: [
          {
            model: User,
            attributes: ["id"],
            include: [
              {
                model: Profile,
                attributes: ["name", "birthdate", "profilePic"],
              },
            ],
          },
          {
            model: Room,
            include: [
              {
                model: Property,
                attributes: ["name", "pic"],
              },
            ],
          },
        ],
      });

      res.status(200).json({
        result: reservation,
        code: 200,
      });
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  addReservation: async (req, res) => {
    try {
      console.log(req.body);
      const {
        startDate,
        endDate,
        status,
        guestCount,
        userId,
        roomId,
        finalPrice,
      } = req.body;

      const result = await sequelize.transaction(async (t) => {
        const reservation = await Reservation.create(
          {
            startDate,
            endDate,
            status,
            guestCount,
            userId,
            roomId,
            finalPrice,
          },
          { transaction: t }
        );
        const disableDay = await RoomUnavailability.create({
          startDate,
          endDate,
          roomId,
          type: 2,
        });

        return {
          id: reservation.id,
        };
      });
      return res.status(200).json({
        result: result,
        disableDay,
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
