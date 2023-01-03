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
    getHistory : async(req,res) => {
        try {
            console.log("masuk ke history");
            console.log(req.query);
            const id = req.query.userId
            const startDate = req.query.startDate
            const endDate = req.query.endDate
            const status = req.query.status
            const page = parseInt(req.query.page) || 0;
            const limit = parseInt(req.query.limit) || 10;
            const offset = limit * page;

            const whereCondition = {
                userId : id
            }

            // versi awal yg paling benar, tapi tidak bsia di pakai
            // if (req.query?.startDate && req.query?.endDate){
            //     whereCondition.startDate = {
            //         [Op.or] : [
            //             {
            //                 startDate: {
            //                     [Op.between]: [startDate, endDate]
            //                 }
            //             }, {
            //                 endDate: {
            //                     [Op.between]: [startDate, endDate]
            //                 }
            //             }
            //         ],
            //     }
            // }

            // paling memungkin kan tapi ambil hanya dari 1 tabel, harus punya ke 2 value
            // if (req.query?.startDate){
            //     whereCondition.startDate =  {[Op.between] : [startDate, endDate]}
            // }

            // if (req.query?.endDate){
            //     whereCondition.endDate =  {[Op.between] : [startDate, endDate]}
            // }

            // versi 2, hasilnya kaya lte dan gte range sama dengan tidka berguna , harus punya ke 2 value
            // if (req.query?.startDate){
            //     whereCondition.startDate =  {[Op.or] : {
            //         [Op.between] : [startDate, endDate]
            //     }}
            // }
            // if (req.query?.endDate){
            //     whereCondition.endDate =  {[Op.or] : {
            //         [Op.between] : [startDate, endDate]
            //     }}
            // }


            // berdasarkan <= && >= versi 1,  range sama dengan ya tidak terpakai, yg terpakai hanya lebih kecil dan besar
                // kalo pakai or bug nya jebool, dna ke 2 data harus di isi
            // if (req.query?.startDate){
            //     whereCondition.startDate =  {[Op.and] : {
            //         [Op.gte] : startDate,
            //         [Op.lte] : endDate
            //     }}
            // }

            // if (req.query?.endDate){
            //     whereCondition.endDate =  {[Op.and] : {
            //         [Op.gte] : startDate,
            //         [Op.lte] : endDate
            //     }}
            // }

            // berdasarkan <= && >= versi 2, udh ga jebol tapi, range sama dengan ya tidak terpakai, yg terpakai lebih besar dankecil
                // ini kemnugkinan paling logiss nya, kemungkina besar utk tidka error dan ini yg akan di pakai
            if (req.query?.startDate){
                whereCondition.startDate =  {
                    [Op.gt] : startDate,
                }
            }

            if (req.query?.endDate){
                whereCondition.endDate =  {
                    [Op.lt] : endDate
                }
            }

            if(req.query?.status){
                whereCondition.status = status
            }
            const bookingHistory = await Reservation.findAndCountAll({
                // where : {userId : id},
                include : [
                    {
                        model : User,
                        attributes : ["id"],
                        include : [
                            {
                                model : Profile,
                                attributes : ["id" , "name" , "profilePic", "birthdate"]
                            }
                        ]
                    },
                    {
                        model : Room,
                        attributes: ["id", "name","defaultPrice", "description"],
                        include : [
                            {
                                model : Property,
                                attributes : ["id", "name", "description", "pic", ]
                            }
                        ]
                    },
                    // pencarian berdasarkan userId
                ],
                // tinggal dibuat condition dari default dan tambahan
                // where : {
                //     userId : id,
                //     [Op.or] : [
                //         {
                //             startDate: {
                //                 [Op.between]: [startDate, endDate]
                //             }
                //         }, {
                //             endDate: {
                //                 [Op.between]: [startDate, endDate]
                //             }
                //         }
                //     ],
                //     status : status 
                // },

                where : whereCondition,
                // sort by invoice, dan endDate
                order : [
                    ["id" , "DESC"],
                    ["createdAt", "DESC"],
                ],
                offset: offset,
                limit: limit,
            })

            const totalRows = bookingHistory.count
            const totalPage = Math.ceil(totalRows / limit)
            return res.status(200).json({
                bookingHistory,
                page,
                limit,
                totalRows,
                totalPage
            })
        } catch (err) {
            return res.status(500).json({
                message : err.toString()
            })
        }
    },
    cancelReservation : async(req, res) => {
        console.log(req.body);
        const {id}= req.body
        console.log(id);
        try {
            const cancelReservation = await Reservation.update(
                {
                    status : 5
                },
                {where :
                    {id : id},
                    returning: true,
                    plain: true,
                }
            )

            return res.status(200).json({
                message : "berhasil canceled reservation",
                code : 200
            })
        } catch (err) {
            return res.status(500).json({
                message : err.toString(),
                code : 500
            })
        }
    }
}