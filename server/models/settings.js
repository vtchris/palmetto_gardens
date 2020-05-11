module.exports = function (sequlize, DataTypes) {
    const Settings = sequlize.define("Settings", {
        companyName: {
            type: DataTypes.STRING(75),
            allowNull: false,
            validate: {
                len: [2, 75]
            }
        },
        address1: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                len: [1, 150]
            }
        },
        address2: {
            type: DataTypes.STRING(150),
            allowNull: true,
            validate: {
                len: [1, 150]
            }
        },
        city: {
            type: DataTypes.STRING(75),
            allowNull: false,
            validate: {
                len: [1, 75]
            }
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        zipCode: {
            type: DataTypes.STRING(9),
            allowNull: false,
            validate: {
                len: [5, 9]
            }
        },
        email: {
            type: DataTypes.STRING(75),
            allowNull: false,
            isEmail: true
        },
        phone1: {
            type: DataTypes.STRING(15),
            allowNull: false,
            is:["^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"]
        },
        taxRate: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue:0,
            isFloat:true,
            min:0,
            max:1
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
    return Settings;
}