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
            isEmail:true
        },
        phone1: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: {
                len: [0, 20]
            }
        },
        password: {
            type: DataTypes.STRING(255),
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
    return User;
}