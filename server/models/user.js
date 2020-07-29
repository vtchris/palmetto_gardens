const bcrypt = require("bcrypt");

module.exports = function (sequlize, DataTypes) {
    const User = sequlize.define("User", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(75),
            allowNull: false,
            validate: {
                len: [2, 75]
            }
        },
        lastName: {
            type: DataTypes.STRING(75),
            allowNull: false,
            validate: {
                len: [2, 75]
            }
        },
        email: {
            type: DataTypes.STRING(75),
            allowNull: false,
            isEmail: true
        },
        phone1: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: {
                len: [0, 20]
            }
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            default: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequlize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequlize.literal('CURRENT_TIMESTAMP')
        }

    })
    User.prototype.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }
    return User;
}