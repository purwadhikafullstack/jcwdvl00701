const { sequelize, User, Profile, UserRole , Tenant} = require("../models");

module.exports = {
    addTenantComplete : async (req,res) => {
        try {
            console.log(req.body);
            const {name , phoneNumber , idCardPic , userId} = req.body

                const result = await sequelize.transaction(async (t) => {
                    const addCompleteTenant =  await Tenant.create(
                    {
                        name,
                        phoneNumber,
                        idCardPic,
                        userId
                    },
                    { transaction: t }
                );
                    
                const addRoleTenant =  await UserRole.create(
                    {
                        userId,
                        roleId: 2
                    },
                    { transaction: t }
                );

                return {
                    name,
                    userId,
                    idCardPic,
                    roleId : addRoleTenant.roleId
                }
            })

            res.status(200).json({
                result : result,
                message : "your data is complete to be tenant"
            })
        } catch (err) {
            return res.status(500).json({
                message : err.toString(),
                code : 500
            })
        }
    },
    addTenantRegister: async (req,res) => {
        try{
            console.log(req.body);
            const {id, firebaseProviderId, email, phoneNumber, idCardPic, name} = req.body

            const result = await sequelize.transaction(async(t) => {
                const user = await User.create(
                    {
                        id : id,
                        firebaseProviderId : firebaseProviderId,
                        email : email
                    },
                    { transaction : t}
                );
                const tenant = await Tenant.create(
                    {
                        name : name,
                        phoneNumber : phoneNumber,
                        idCardPic : idCardPic,
                        userId : id
                    },
                    { transaction : t}
                );
                const tenantRole = await UserRole.create(
                    {
                        userId: id,
                        roleId : 2
                    },
                    { transaction : t}
                )

                return {
                    id: id,
                    name: name,
                    firebaseProviderId: firebaseProviderId,
                    email: email,
                }
            })

            return res.status(200).json({
                result : result,
                message : "success add data tenant",
                code : 200
            })
        } catch (err){
            return res.status(500).json({
                message : err.toString()
            })
        }
    },
    getTenantById : async (req,res) => {
        const id = req.query.id

        try {
            // ambil berdasarkan user yg disantukan dengan tenant(include)
            const tenantOne = await Tenant.findOne({
                where : {userId : id},
                include: [
                    {
                        model:User,
                        required:true
                    }
                ]
            })

            res.status(200).send({
                result: tenantOne,
                message: "success",
                code: 200,
            })
        } catch (err) {
            res.status(500).json({
                message: err.toString()
            })
        }
    } 
}