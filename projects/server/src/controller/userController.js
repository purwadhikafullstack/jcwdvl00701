const {db, dbquery} = require("../database")
const Crypto = require("crypto")
const {User} = require("../lib/sequelize");
const { sendEmailVerification } = require("firebase/auth");

module.exports = ({
    addUser : async (req,res) => {
        try {
            console.log(req.body);
            const {id,name, email,phoneNumber,gender, birthdate, profile_pic, isVerified, firebaseProviderId } = req.body

            const newUser = await User.create({
                id,
                name,
                email,
                phoneNumber,
                gender,
                birthdate,
                profile_pic,
                isVerified,
                firebaseProviderId
            })

            // const Otp = await sendEmailVerification.create({
            //     const otp = 1000 * mathR
            // })

            return res.status(200).json({
                message : "success add data",
                results : newUser
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
            return res.status(200).send({
                getUser
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message : err.toString()
            })
        }
    },
    getUserOne : async (req,res) => {
        try {
            console.log(req.query.email)
            
            const email = req.query.email
            
            const getUserOne = await User.findOne({
                where : {
                    email
                }
            })
            console.log(getUserOne);
            return res.status(200).json({
                results: getUserOne
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message : err.toString()
            })
        }
    },
})