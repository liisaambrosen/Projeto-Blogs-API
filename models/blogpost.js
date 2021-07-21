const BlogPost = (sequelize, DataTypes) => {
  const defineBlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { timestamps: false });
  defineBlogPost.associate = (models) => {
    defineBlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return defineBlogPost;
};

module.exports = BlogPost;
