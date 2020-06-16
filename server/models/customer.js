module.exports = function (sequlize, DataTypes) {
    const Customer = sequlize.define("Customer", {
        customer_id: {
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
        address1: {
            type: DataTypes.STRING(75),
            allowNull: false,
            validate: {
                len: [5, 75]
            }
        },
        address2: {
            type: DataTypes.STRING(75),
            allowNull: true,
            validate: {
                len: [0, 75]
            }
        },
        city: {
            type: DataTypes.STRING(75),
            allowNull: false,
            validate: {
                len: [3, 75]
            }
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false,
            validate: {
                len: [2, 2]
            }
        },
        zipCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                len: [5, 10]
            }
        },
        email: {
            type: DataTypes.STRING(75),
            allowNull: false,
            isEmail:true
        },
        phone1: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: {
                len: [0, 20]
            }
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
    return Customer;
}