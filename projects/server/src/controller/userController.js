const {db, dbquery} = require("../database")
const Crypto = require("crypto")
const {User} = require("../lib/sequelize")

module.exports = ({
    patchUser: async (req, res) => {
        const id = req.body.id;


        try {
            const result = await User.update(
                req.body,
                {where: {id}}
            )

            return res.status(200).send({
                result: result,
                message : "success update user"
            })
        } catch (err) {
            return res.status(500).json({
                message : err.toString()
            })
        }
    }
})