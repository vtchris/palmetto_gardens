module.exports = function (sequlize, DataTypes) {
    const Invoice = sequlize.define("Invoice", {
        inv_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        inv_nbr: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        inv_status: {
            type: DataTypes.CHAR,
            allowNull: false,
            defaultValue: 'O'
        },
        inv_subtotal: {
            type: DataTypes.DECIMAL(15,2),
            allowNull: false,
            defaultValue: 0
        },
        inv_tax: {
            type: DataTypes.DECIMAL(15,2),
            allowNull: false,
            defaultValue: 0
        },
        inv_total: {
            type: DataTypes.DECIMAL(15,2),
            allowNull: false,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequlize.literal('CURRENT_TIMESTAMP')
        },
        fulfilledAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequlize.literal('CURRENT_TIMESTAMP')
        }
    })
    Invoice.associate = function (models) {
        Invoice.belongsTo(models.Customer, {
            foreignKey: {
                name: "customer_id",
                allowNull: false
            }
        })
    }
    return Invoice;
}