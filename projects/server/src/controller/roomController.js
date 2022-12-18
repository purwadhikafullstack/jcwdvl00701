const { registerVersion } = require("firebase/app");
const {Room, Property} = require("../lib/sequelize")
// const {} = require("../models")
const {Op} = require("sequelize")

module.exports = ({
    getRoom : async (req,res) => {
        try{
            // yg kita ambil room ya itu berdasarkan id tenant
            const room = await Room.findAll()
            // const room = await Room.findAll({
            //     where : {
            //         id : tenantId
            //     }
            // })
            console.log(room);
            return res.status(200).send({
                room
            })
        } catch (error) {
            return res.status(500).json({
                message : "you dont have room right now"
            })
        }
    },
    getRoomForTenantPage : async (req,res) => {
        try{
            const room = await Room.findAll({
                where: req.query,
                include: [
                    {
                        model: Property,
                    }
                ]
            })
            return res.status(200).send({
                result: room,
                code: 200
            })
        } catch (error) {
            return res.status(500).json({
                message : "you dont have room right now"
            })
        }
    },
    addRoom : async (req,res) => {
        try {
            console.log(req.body);
            const {id, name, defaultPrice, description, capacity, propertyId} = req.body

            const newRoom = await Room.create({
                id,
                name,
                defaultPrice,
                description,
                capacity,
                propertyId
            })

            return res.status(200).json({
                message : "success add new Room",
                result : newRoom
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message : error.toString()
            })
        }
    },
    getRoomProperty : async (req,res,next) => {
        //ambil dari tabel room yg dijoin dengan property
        try {
            const id = req.params.id
            const page  = parseInt(req.query.page) || 0;
            const limit = parseInt(req.query.limit) || 10;
            const searchQuery = req.query.searchQuery || "";
            const offset = limit * page;
            const alfabet = req.query.alfabet || "ASC";
            const time = req.query.time || "ASC";
            const price = req.query.price || "ASC";
            
            // ambil room yg di inner join ke table property berdasarkan tenant id ==> sudah ketemu

            // kondisi utk mencari dari searh / dari propertyId nya
            const whereCondition = {
                name :{[Op.like] : "%" + searchQuery + "%"}
                
            }

            if(req.query?.propertyId){
                whereCondition.propertyId = req.query.propertyId
            }

            const roomProperty = await Room.findAndCountAll({
                include : [{
                    model : Property,
                    // attributes : ["name", "picture"],
                    where : {
                        tenantId : id
                    },
                    order:[
                        ["name" , `${alfabet}`],
                    ],
                    required : true
                }],
                where : whereCondition,

                order: [
                    ["name" , `${alfabet}`],
                    ["updatedAt", `${time}`],
                    ["defaultPrice", `${price}`],
                ],
                offset: offset,
                limit : limit
            })

            const totalRows = roomProperty.count
            const totalPage = Math.ceil(totalRows / limit)
            
            res.status(200).json({
                roomProperty,
                page,
                limit,
                totalRows,
                totalPage
            })
        } catch (err) {
            // utk menampilkan error
            res.status(500).json({
                message : err.toString()
            })
        }
    },
    updateRoom : async (req,res) => {
        try {
            // get body data
            console.log(req.body);
            const { name, defaultPrice, description, capacity, propertyId} = req.body
            // console.log(req.query.id);
            // get params
            const id = req.params.id
            // update room
            const updateRoom = await Room.update(
                {
                    //yg di update nya
                    id,
                    name,
                    defaultPrice,
                    description,
                    capacity,
                    propertyId
                },
                {
                    where : {
                        // dapat dari params
                        id : id
                    }
                }
            )
            res.status(200).json({
                message : "success update room",
                result : updateRoom
            })
        } catch (err) {
            res.status(500).json({
                message : err.toString()
            })
        }
    },
    deleteRoom : async (req,res) => {
        try {
            const id = req.body.id
            console.log(id);
            const deleteRoom = await Room.destroy({
                // berdasarkan id room
                where : {
                    id : id
                }
            })
            res.status(200).send({
                message : "success delete room",
                result : deleteRoom
            })
        } catch (err) {
            res.status(500).json({
                message : err.string
            })
        }
    },
    getRoomOne : async (req,res) => {
        try {
            const id = req.params.id
            console.log(id);
            const roomOne = await Room.findOne({
                include : [{
                    model : Property
                }],
                where : {
                    id : id
                }
            })

            res.status(200).send({
                roomOne
            })
        } catch (err) {
            res.status(500).json({
                message : err.toString()
            })
        }
    },
    // get property semua utk dropdown
    getPropertyDropdown : async (req, res) => {
        try {
            //dibuat khsus utk dpt dropdown
            const dropdown = await Property.findAll()
            res.status(200).send({
                dropdown
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({
                message : err.toString()
            })
        }
    }
})