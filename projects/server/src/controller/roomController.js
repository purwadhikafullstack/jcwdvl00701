const { registerVersion } = require("firebase/app");
const {Room, Property, Category} = require("../lib/sequelize")
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
            console.log(id);
            const searchQuery = req.query.searchQuery || "";
            // ambil room yg di inner join ke table property berdasarkan tenant id ==> sudah ketemu
            const roomProperty = await Room.findAll({
                include : [{
                    model : Property,
                    // attributes : ["name", "picture"],
                    where : {
                        tenantId : id
                    },
                    required : true
                }],
                where : {
                    name :{[Op.like] : "%" + searchQuery + "%"}
                }
            })
            res.status(200).json({
                roomProperty
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
    filteringRoom : async (req, res) => {
        //dummy utk tes, nanti di hapus
        try {
            // const page  = parseInt(req.query.page) || 0;
            // const limit = parseInt(req.query.limit) || 0;
            const searchQuery = req.query.searchQuery || "";
            console.log(req.query.searchQuery);
            // const offset = limit * page
            const totalRows = await Room.findAll({
                where : {
                    name :{[Op.like] : "%" + searchQuery + "%"
                }}           
            })

            res.status(200).json({
                totalRows
            })
        } catch (err) {
            res.status(500).json({
                message : err.toString()
            })
        }
    }
})