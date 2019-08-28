module.exports = {
  "type": "mysql",
  "host": process.env.DB_HOST || 'hhapp-database',
  "port": 3306,
  "username": "hhapp",
  "password": "password",
  "database": "hhapp",
  "logging": true,
  "synchronize": true
}
