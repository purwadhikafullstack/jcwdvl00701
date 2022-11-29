const {db, dbquery} = require("../database")
const Crypto = require("crypto")
const {User} = require("../lib/sequelize")

module.exports = ({
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

    getUser: async (req, res) => {
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
    }
})