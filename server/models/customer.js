module.exports = function (sequlize, DataTypes) {
    const Customer = sequlize.define("Customer", {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
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
        }
    })
    return Customer;
}