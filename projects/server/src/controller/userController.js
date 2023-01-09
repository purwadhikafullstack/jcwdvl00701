const { sequelize, User, Profile, UserRole , Tenant} = require("../models");

module.exports = {
  addUser: async (req, res) => {
    try {
      const {
        id,
        name,
        email,
        phoneNumber,
        firebaseProviderId,
      } = req.body;

      const result = await sequelize.transaction(async (t) => {
        const user = await User.create(
          {
            id: id,
            firebaseProviderId: firebaseProviderId,
            email: email,
          },
          { transaction: t }
        );

        const profile = await Profile.create(
          {
            name: name,
            phoneNumber: phoneNumber || "0",
            gender: "Male",
            userId: id,
          },
          { transaction: t }
        );

        const userProfile = await UserRole.create(
          {
            userId: id,
            roleId: 1,
          },
          { transaction: t }
        );

        return {
          id: id,
          name: name,
          firebaseProviderId: firebaseProviderId,
          email: email,
        };
      });

      return res.status(200).json({
        result: result,
        message: "success add data",
        code: 200,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  getUserAll: async (req, res) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Profile,
            required: true,
            attributes: {
              exclude: ["id", "userId", "UserId"],
            },
          },
        ],
      });

      return res.status(200).send({
        result: users,
        message: "success",
        code: 200,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  getUserById: async (req, res) => {
    const id = req.query.id;

    try {
      const user = await Profile.findOne({
        where: { userId : id },
        include: [
          {
            model: User,
            required: true,
            attributes: {
              exclude: ["id", "userId", "UserId"],
            },
          },
        ],
      });

      return res.status(200).send({
        result: user,
        message: "success",
        code: 200,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findOne({
        where: req.query,
        include: [
          {
            model: Profile,
            required: true,
            attributes: {
              exclude: ["id", "userId", "UserId"],
            },
          },
        ],
      });
      return res.status(200).json({
        result: user,
        message: "success get user",
        code: 200,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  verificationUser: async (req, res) => {
    try {
      console.log(req.body);
      const UpdateVerified = await User.update({
        isVerified: "true",
      });
      return res.status(200).json({
        message: "Password Updated",
      });
    } catch (error) {
      res.status(500).json({
        message: "Invalid Change Password",
      });
    }
  },

  patchUser: async (req, res) => {
    const id = req.body.id;

    try {
      await User.update(req.body, {
        where: { id },
        returning: true,
        plain: true,
      });

      const user = await User.findByPk(id);

      return res.status(200).send({
        result: user,
        message: "success update user",
        code: 200,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  updateUserProfilePic: async (req, res) => {
    const id = req.body.id;
    const { filename } = req.file;
    const fileUrl = `/profile_pic/${filename}`;

    try {
      await User.update(
        { profilePic: fileUrl },
        { where: { id }, returning: true, plain: true }
      );
      return res.status(200).send({
        result: { profilePic: fileUrl },
        message: "success update profile picture",
        code: 200,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  userRedux : async (req, res) => {
        try {
            console.log(req.query.id);
            // const email = req.query.email
            const id = req.query.id // userId
            const globalState= await User.findOne({
                include : [
                {
                  model : Profile,
                  attributes : ["name" , "profilePic"]
                },
                {
                    model: UserRole,
                    attributes : ["roleId"],
                },
                {
                    model : Tenant,
                    attributes : ["id", "name"],
                }           
            ],
                where : {
                    id
                }
            })
            // console.log(globalState);
            return res.status(200).json({
                globalState
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message : "your email not registered"
            })
        }
  },
  // add user jika dari tenant mau jadi user
  completeDataUser : async(req,res) => {
    try {
      console.log(req.body);
      const {name, phoneNumber , userId} = req.body
      // tambahakan data ke profile
      const result = await sequelize.transaction(async(t) => {
        const completeDataUser = await Profile.create(
          {
            name,
            phoneNumber,
            gender : "Male",
            userId
          },
          {transaction : t}
        )
          // tambhakan UserRole yg user [1]
        const addRoleUser = await UserRole.create(
          {
            userId,
            roleId : 1
          },
          {transaction: t}
        );

        return {
          name,
          userId,
          roleId : addRoleUser.roleId
        }
      })

      return res.status(200).json({
        result : result,
        message: "now your account can be accsess to be user",
        code: 200
      })
    } catch(err) {
      return res.status(500).json({
        message : err.toString(),
        code : 500
      })
    }
  }
};
