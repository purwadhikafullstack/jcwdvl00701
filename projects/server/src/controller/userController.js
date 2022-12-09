const {db, dbquery} = require("../database")
const Crypto = require("crypto")
const {User} = require("../lib/sequelize")

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
            console.log(req.query.id);
            const email = req.query.email
            const id = req.query.id
            const getUserOne = await User.findOne({
                where : {
                    id,
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
                message : "your email not registered"
            })
        }
    },
    verificationUser : async (req, res) => {
        try {
            console.log(req.body);
            const UpdateVerified = await User.update({
                isVerified : "true"
            })
            return res.status(200).json({
                message : "Password Updated"
            })
        } catch (error) {
            res.status(500).json({
                message : "Invalid Change Password"
            })
        }
    },
    patchUser: async (req, res) => {
        const id = req.body.id;

        try {
            await User.update(
                req.body,
                {where: {id}, returning: true, plain: true}
            )

            const user = await User.findByPk(id)

            return res.status(200).send({
                result: user,
                message : "success update user",
                code: 200
            })
        } catch (err) {
            return res.status(500).json({
                message : err.toString(),
                code: 500
            })
        }
    },

    getUserById: async (req, res) => {
        const id = req.query.id;

        try {
            const user = await User.findByPk(id)

            return res.status(200).send({
                result: user,
                message : "success get user",
                code: 200
            })
        } catch (err) {
            return res.status(500).json({
                message : err.toString(),
                code: 500
            })
        }
    },

    updateUserProfilePic: async (req, res) => {
        const id = req.body.id;
        const { filename } = req.file;
        const fileUrl = `/profile_pic/${filename}`

        try {
            await User.update(
                {profilePic: fileUrl},
                {where: {id}, returning: true, plain: true}
            )
            return res.status(200).send({
                result: {profilePic: fileUrl},
                message: "success update profile picture",
                code: 200
            })
        } catch (err) {
            return res.status(500).json({
                message : err.toString(),
                code: 500
            })
        }
    }
})