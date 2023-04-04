const sequelize = require('../config/connection');
const { User } = require('../models')

const userData = [
    {
        username: "Lernantino",
        password: "password12345"
    },
    {
        username: "Xandromus",
        password: "password12345"
    }
]
const seedUser = async () => {
    await sequelize.sync({force: true})

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    })
}

module.exports = seedUser
