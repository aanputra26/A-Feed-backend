import { Sequelize } from 'sequelize';

const db = new Sequelize('auth_capstone', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
