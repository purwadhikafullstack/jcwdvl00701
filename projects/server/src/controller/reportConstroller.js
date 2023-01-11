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
const transporter = require("../middleware/nodemailer");
const cron = require("node-cron");
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
                attributes: ["id", "name", "pic", "description", "rules"],
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
            attributes: ["id", "email"],
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
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 5;

      const finalPrice = req.query.final_price || "ASC";
      const time = req.query.time || "ASC";
      const offset = limit * page;
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
      const salsesReport = await Reservation.findAndCountAll({
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
        order: [
          ["finalPrice", `${finalPrice}`],
          ["startDate", `${time}`],
        ],
        offset,
        limit,
        where: whereCondition,
      });
      const totalRows = salsesReport.count;
      const totalPage = Math.ceil(totalRows / limit);

      const totalSales = await Reservation.findAll({
        attributes: ["finalPrice"],
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
      });

      res.status(200).json({
        result: salsesReport,
        page,
        limit,
        totalRows,
        totalPage,
        totalSales,
        code: 200,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
  // endpoint utk kirim email, bentuk post
  emailOrder: async (req, res) => {
    try {
      console.log(req.body);
      const {
        property,
        room,
        checkIn,
        checkOut,
        guest,
        name,
        totalPrice,
        email,
        address,
        rules,
      } = req.body;

      let mail = {
        from: "Admin <turujcwdvl00701@gmail.com>",
        to: `${email}`,
        subject: "Information Room",
        html: `
        <h1>yth ${name}</h1>
        <h2>Thankyou for reservation at ${property}</h2>
        <h3><b>Your Reservation Detail</b></h3>
        <p>Name Room : ${room}</p>
        <p>Guest : ${guest}</p>
        <p>Check in : ${checkIn}</p>
        <p>Check out : ${checkOut}</p>
        <p>Total Price : ${totalPrice}</p>
        <p>Address : ${address}</p>
        <p>Rules : ${rules}</p>
        
        <p>thank you for use our service</p>
        <p>PT.Turu Jaya Abadi</p>
        `,
      };

      transporter.sendMail(mail, (errMail, resMail) => {
        if (errMail) {
          console.log(errMail);
          return res.status(500).send({
            message: "email failed",
            success: false,
            err: errMail,
          });
        }

        return res.status(200).json({
          message: "email success , check your email",
          success: true,
          code: 200,
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "email failed",
        code: 500,
      });
    }
  },
};

cron.schedule("0 10 * * *", () => {
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date();
  Reservation.update(
    {
      status: 4,
    },
    {
      where: {
        startDate: {
          [Op.gte]: TODAY_START,
          [Op.lte]: NOW,
        },
        status: 3,
      },
    }
  );
});

cron.schedule("0 12 * * *", () => {
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date();
  Reservation.update(
    {
      status: 6,
    },
    {
      where: {
        endDate: {
          [Op.gte]: TODAY_START,
          [Op.lte]: NOW,
        },
        status: 4,
      },
    }
  );
});
