module.exports = function (sequlize, DataTypes) {
    const Categories = sequlize.define("Categories", {
        category: {
            type: DataTypes.STRING(75),
            allowNull: false,
            validate: {
                len: [1, 75]
            }
        },
        img: {
            type: DataTypes.STRING(150),
            allowNull: true,
            validate: {
                len: [1, 150]
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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
    Categories.associate = function (models) {
        Categories.hasMany(models.Products,{sourceKey: 'id'})
    }
    return Categories;
}