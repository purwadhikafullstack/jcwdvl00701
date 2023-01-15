const {
Property,
Reservation,
User,
Profile,
Room,
Transaction,
RoomUnavailability,
Review,
sequelize,
} = require("../models");
const { Op } = require("sequelize");

module.exports = {
getHistory: async (req, res) => {
    try {
    console.log("masuk ke history");
    console.log(req.query);
    const id = req.query.userId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const status = req.query.status;
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = limit * page;

    const whereCondition = {
        userId: id,
    };
    // berdasarkan <= && >= versi 2, udh ga jebol tapi, range sama dengan ya tidak terpakai, yg terpakai lebih besar dankecil
    // ini kemnugkinan paling logiss nya, kemungkina besar utk tidka error dan ini yg akan di pakai
    if (req.query?.startDate) {
        whereCondition.startDate = {
        [Op.gte]: startDate,
        };
    }

    if (req.query?.endDate) {
        whereCondition.endDate = {
        [Op.lte]: endDate,
        };
    }

    if (req.query?.status) {
        whereCondition.status = status;
    }
    const bookingHistory = await Reservation.findAndCountAll({
        // where : {userId : id},
        include: [
        {
            model: User,
            attributes: ["id"],
            include: [
            {
                model: Profile,
                attributes: ["id", "name", "profilePic", "birthdate"],
            },
            ],
        },
        {
            model: Room,
            attributes: ["id", "name", "defaultPrice", "description"],
            include: [
            {
                model: Property,
                attributes: ["id", "name", "description", "pic"],
            },
            ],
        },
        {
            model: Review,
        },
        // pencarian berdasarkan userId
        ],
        where: whereCondition,
        // sort by invoice, dan endDate
        order: [
        ["id", "DESC"],
        ["createdAt", "DESC"],
        ],
        offset: offset,
        limit: limit,
    });

    const totalRows = bookingHistory.count;
    const totalPage = Math.ceil(totalRows / limit);
    return res.status(200).json({
        bookingHistory,
        page,
        limit,
        totalRows,
        totalPage,
    });
    } catch (err) {
    return res.status(500).json({
        message: err.toString(),
    });
    }
},
cancelReservation: async (req, res) => {
    console.log(req.body);
    const { id, startDate, roomId } = req.body;
    console.log(id);
    try {
    const cancelReservation = await Reservation.update(
        {
        status: 5,
        },
        { where: { id: id }, returning: true, plain: true }
    );

    await RoomUnavailability.destroy({
        where: {
        startDate: new Date(startDate),
        roomId,
        type: 2,
        },
    });

    return res.status(200).json({
        message: "berhasil canceled reservation",
        code: 200,
    });
    } catch (err) {
    return res.status(500).json({
        message: err.toString(),
        code: 500,
    });
    }
},
addReview: async (req, res) => {
    console.log(req.body);
    const { reservationId, comment } = req.body;
    try {
    const result = await sequelize.transaction(async (t) => {
        const review = await Review.create(
        {
            comment,
            reservationId,
        },
        { transaction: t }
        );

        return {
        review,
        };
    });

    return res.status(200).json({
        result: result,
        code: 200,
        message: "succses add review",
    });
    } catch (err) {
        return res.status(500).json({
            message: err.toString(),
            code: 500,
        });
        }
    },
};