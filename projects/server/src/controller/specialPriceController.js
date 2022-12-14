const {sequelize, SpecialPrice, Property, Room, Tenant, User} = require('../models')

const wrapper = async (req, res, func) => {
    try {
        const {result, message} = await func()
        return res.status(200).json({
            result: result,
            message: message,
            code: 200
        })
    } catch (err) {
        return res.status(500).json({
            message: err.toString(),
            code: 500
        })
    }
}

module.exports = {
    add: async (req, res) => {
        return await wrapper(req, res, async () => {
            const {type, discount, startDate, endDate, roomId} = req.body

            await SpecialPrice.create({
                type: type, discount: discount, startDate: startDate, endDate: endDate, roomId: roomId
            })

            const result = {type: type, discount: discount, startDate: startDate, endDate: endDate, roomId: roomId}

            return {
                result: result,
                message: 'success add special price'
            }
        })
    },

    getAll: async (req, res) => {
        return await wrapper(req, res, async () => {
            const {uid} = req.query
            const result = await SpecialPrice.findAll({
                include: [{
                    model: Room,
                    required: true,
                    group: 'propertyId',
                    include: [{
                        model: Property,
                        required: true,
                        include: [{
                            model: Tenant,
                            required: true,
                            include: [{
                                model: User,
                                required: true,
                                where: {id: uid}
                            }]
                        }]
                    }]
                }],
                order: [
                    [{model: Room}, {model: Property}, 'id', 'DESC'],
                ],
            })

            return {
                result: result,
                message: 'success get special prices'
            }
        })
    },

    get: async (req, res) => {
        return await wrapper(req, res, async () => {
            const {id} = req.query
            const result = await SpecialPrice.findOne({
                where: {id: id},
                include: [{
                    model: Room,
                    required: true,
                    include: [{
                        model: Property,
                        required: true,
                        include: [{
                            model: Tenant,
                            required: true,
                            include: [{
                                model: User,
                                required: true,
                            }]
                        }]
                    }]
                }]
            })

            return {
                result: result,
                message: 'success get special price'
            }
        })
    },

    update: async (req, res) => {
        return await wrapper(req, res, async () => {
            const id = req.body.id
            await SpecialPrice.update(
                req.body, {where: {id: id}}
            )
            const result = await SpecialPrice.findOne({
                where: {id: id},
                include: [{
                    model: Room,
                    required: true,
                    include: [{
                        model: Property,
                        required: true,
                        include: [{
                            model: Tenant,
                            required: true,
                            include: [{
                                model: User,
                                required: true,
                            }]
                        }]
                    }]
                }]
            })

            return {
                result: result,
                message: 'success update special price'
            }
        })
    },

    delete: async (req, res) => {
        return await wrapper(req, res, async () => {
            const id = req.body.id
            const result = await SpecialPrice.findOne({
                where: {id: id},
                include: [{
                    model: Room,
                    required: true,
                    include: [{
                        model: Property,
                        required: true,
                        include: [{
                            model: Tenant,
                            required: true,
                            include: [{
                                model: User,
                                required: true,
                            }]
                        }]
                    }]
                }]
            })
            await SpecialPrice.destroy({
                where: {id: id}
            })

            return {
                result: result,
                message: 'success delete special price'
            }
        })
    },
}