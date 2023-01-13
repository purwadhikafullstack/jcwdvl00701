const { sequelize, User, Profile, UserRole , Tenant, Reservation, Room, Property, Bank, Transaction} = require("../models");

module.exports = {
    getPayment : async(req,res) => {
        const id = req.query.id
        console.log(id);

        try{
            const payment = await Reservation.findOne({
                where : {
                    id
                },
                include : [
                    {
                        model : User, 
                        attributes : ["id"]
                    },
                    {
                        model : Room,
                        include : [
                            {
                                model : Property,
                                attributes : ["name", "pic"],
                                include : [
                                    {
                                        model : Tenant,
                                        attributes : ["id" , "name" , "bankAccountNumber", "bankId"],
                                        include : [
                                            {
                                                model : Bank,
                                                attributes : ["name"]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })

            res.status(200).json({
                result : payment,
                code:200
            })
        } catch(err) {
            res.status(500).json({
                message: err.toString(),
                code : 500
            })
        }
    },
    addPayment : async(req,res) => {
        console.log(req.body)
        const {reservationId} = req.body
        const {filename} = req.file
        console.log(filename);
        const fileUrl = `/payment/${filename}`

        try{
                const transaction = await Transaction.create(
                    {
                        paymentProof : fileUrl,
                        reservationId
                    }
                )

                const reservation = await Reservation.update(
                    {
                        status : 2
                    },
                    {where : 
                        {id : reservationId},
                        returning: true,
                        plain: true,
                    }
                )

            return res.status(200).json({
                message : "success for payment",
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