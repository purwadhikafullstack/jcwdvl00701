const {db, dbquery} = require("../database")
const Crypto = require("crypto")
const {User} = require("../lib/sequelize")

module.exports = ({
    addUser : async (req,res) => {
        try {
            console.log(req.body);
            const {name, email,phone_number,gender, birthdate, profile_pic, is_verified } = req.body

            await User.create({
                name,
                email,
                phone_number,
                gender,
                birthdate,
                profile_pic,
                is_verified
            })

            return res.status(200).send({
                message : "success add data"
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message : err.toString()
            })
        }
    },
    getUser : async (req,res) => {
        try {
            const getUser = await User.findAll()
            console.log(getUser);
            return res.status(200).json({
                results: getUser
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message : err.toString()
            })
        }
    }
})