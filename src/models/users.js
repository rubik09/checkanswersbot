import pool from '../utils/MySQL';

class User {
  constructor() {
    this.sql = pool;
  }

  async createTableUsers() {
    return this.sql.query(`CREATE TABLE users IF NOT EXISTS (id INT AUTO_INCREMENT PRIMARY KEY, userId VARCHAR(255) DEFAULT "", username VARCHAR(255) DEFAULT "") ENGINE=InnoDB AUTO_INCREMENT=76395 DEFAULT CHARSET=utf8mb4;`);
  }

  async getUserId(userId) {
    return this.sql.query('SELECT userId FROM users WHERE ?', { userId });
  }

  async addUser(userId, username) {
    return this.sql.query('INSERT INTO users (userId, username) VALUES (?,?);', [`${userId}`, `${username}`]);
  }

  async getUsersId() {
    return this.sql.query('SELECT userId FROM users');
  }

  async checkStage1(userId) {
    return this.sql.query('SELECT stage1 FROM users WHERE userId=?', [`${userId}`]);
  }

  async checkStage2(userId) {
    return this.sql.query('SELECT stage2 FROM users WHERE userId=?', [`${userId}`]);
  }

  async checkStage3(userId) {
    return this.sql.query('SELECT stage3 FROM users WHERE userId=?', [`${userId}`]);
  }

  async changeStage1Status (userId) {
    return this.sql.query ('UPDATE users SET stage1=? WHERE userId=?', ['+', `${userId}`]);
  }

  async changeStage2Status (userId) {
    return this.sql.query ('UPDATE users SET stage2=? WHERE userId=?', ['+', `${userId}`]);
  }

  async changeStage3Status (userId) {
    return this.sql.query ('UPDATE users SET stage3=? WHERE userId=?', ['+', `${userId}`]);
  }
}

export default new User();
