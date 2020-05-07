module.exports = function (sequlize, DataTypes) {
    const Products = sequlize.define("Products", {
        itm_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        itm_nbr: {
            type: DataTypes.STRING(75),
            allowNull: true,
            validate: {
                len: [1,75]
              }
        },
        itm_cost:{
            type: DataTypes.DOUBLE,
            allowNull: false,            
            defaultValue: 0
        },
        itm_prc:{
            type: DataTypes.DOUBLE,
            allowNull: false,            
            defaultValue: 0
        },
        itm_unit_of_measure:{
            type: DataTypes.STRING,
            allowNull: false,  
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