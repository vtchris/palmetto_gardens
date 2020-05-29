module.exports = function (sequlize, DataTypes) {
    const Article = sequlize.define("Article", {
        title:{
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                len: [1, 50]
            }
        },
        content:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false,            
        },
        img: {
            type: DataTypes.STRING(150),
            allowNull: true,
            validate: {
                len: [1, 255]
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
    
    return Article;
}