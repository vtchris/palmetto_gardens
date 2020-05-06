module.exports = function (sequlize, DataTypes) {
    const Products = sequlize.define("Products", {
        itm_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        itm_nbr: {
            type: DataTypes.STRING(75),
            allowNull: true,
            vvalidate: {
                len: [1,75]
              }
        },
        itm_prc:{
            type: DataTypes.DOUBLE,
            allowNull: false,
            allowNull: false,
            defaultValue: 0
        },
        taxable:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
    return Products;
}