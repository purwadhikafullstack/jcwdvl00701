const {
  Property,
  Reservation,
  User,
  Profile,
  Room,
  Transaction,
  RoomUnavailability,
  Tenant,
} = require("../models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const transporter = require("../middleware/nodemailer");
const cron = require("node-cron");
const fs = require("fs");
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
            paranoid: false,
            attributes: ["id", "name"],
            where: whereCondition,
            include: [
              {
                model: Property,
                attributes: ["id", "name", "pic", "description" , "rules"],
                required: true,
                paranoid: false,
                where: {
                  tenantId,
                },
                include: [
                  {
                    model: Tenant,
                    attributes: ["phoneNumber"],
                  }
                ]
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
      const { paymentProof } = req.body;
      console.log(paymentProof);
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

      if (status === 1) {
        await Transaction.destroy({
          where: {
            paymentProof,
          },
        });

        const path = `${__dirname}/../public/${paymentProof}`;
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

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
            paranoid : false,
            include: [
              {
                model: Property,
                required: true,
                paranoid : false,
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
        paranoid : false
      });
      const totalRows = salsesReport.count;
      const totalPage = Math.ceil(totalRows / limit);

      const totalSales = await Reservation.findAll({
        where: { status: statusFinished },
        attributes: ["finalPrice"],
        include: [
          {
            model: Room,
            required: true,
            paranoid : false,
            include: [
              {
                model: Property,
                required: true,
                paranoid : false,
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
        status,
        phoneNumber,
        roomId,
      } = req.body;
      console.log(status);
      let mail;
      if (status === 3) {
        mail = {
          from: "Admin <turujcwdvl00701@gmail.com>",
          to: `${email}`,
          subject: "Information Room",
          html: `
          <h3>Dear ${name}</h3>
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
      } else if (status === 5) {
        mail = {
          from: "Admin <turujcwdvl00701@gmail.com>",
          to: `${email}`,
          subject: "Cancellation of Room Reservation",
          html: `
          <h3>Dear ${name}</h3>
          <p>I am writing to apologize for the cancellation of your room reservation. We understand that this may have caused inconvenience to you and we would like to offer our sincerest apologies.</p>
          <p>The reason for the cancellation of your reservation was due to an operational error on our end. Despite our efforts to resolve the issue, we were unfortunately unable to fulfill your reservation for:</p>
          <p>Check in : ${checkIn}</p>
          <p>Check out : ${checkOut}</p>
          <p>Name Room : ${room}</p>
          <p>Guest : ${guest}</p>
          <p>Total Price : ${totalPrice}</p>
          <p>We would like to inform you that a full refund for your reservation will be processed as soon as possible. Please contact our customer service team at ${phoneNumber} for further assistance with the refund process.</p>
          <p>Once again, we apologize for any inconvenience caused and we hope to have the opportunity to serve you again in the future.</p>
          
          <p>PT.Turu Jaya Abadi</p>
          `,
        };
      }

      if (status === 5) {
        await RoomUnavailability.destroy({
          where: {
            startDate: new Date(checkIn),
            roomId,
            type: 2,
          },
        });
      }

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
