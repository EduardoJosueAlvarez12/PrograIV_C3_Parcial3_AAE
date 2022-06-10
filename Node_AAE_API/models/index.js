const dbConfig = require('../db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user.js')(sequelize, Sequelize);
db.post= require('./posts.js')(sequelize, Sequelize);

//foraneas entre tablas
db.user.hasMany(db.post,{as:'posts'});
db.post.belongsTo(db.user, { foreignKey: 'userId',as: 'user' });



module.exports = db;
