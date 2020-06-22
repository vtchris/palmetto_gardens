module.exports = function (sequlize, DataTypes) {
    const Invoice_line = sequlize.define("Invoice_line", {
        inv_ln_itm_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        itm_nbr: {
            type: DataTypes.STRING(75),
            allowNull: true
        },
        itm_name: {
            type: DataTypes.STRING(75),
            allowNull: false
        },
        itm_cost: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        itm_prc: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        itm_qty: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        inv_ln_ext: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        inv_ln_status: {
            type: DataTypes.CHAR,
            allowNull: false,
            defaultValue: 'O'
        },
        taxable: {
            type: DataTypes.BOOLEAN,
            allowNull: false
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
    Invoice_line.associate = function (models) {
        Invoice_line.belongsTo(models.Invoice, {
            foreignKey: "invoice_id",
            targetKey: "inv_id",
            allowNull: false
        
        }),
            Invoice_line.belongsTo(models.Products, {
                foreignKey: "product_id",
                targetKey: "id",
                allowNull: false
            })
    }

    return Invoice_line;
}