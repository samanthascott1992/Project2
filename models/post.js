module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 45]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        zipCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isNumeric: true
        },
        images: {
            type: DataTypes.STRING
        }
    });

    Post.associate = function(models){
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Post;

};