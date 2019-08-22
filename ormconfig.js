module.exports = {
  "type": "mysql",
  "host": process.env.DB_HOST || 'hhapp-database',
  "port": 3306,
  "username": "hhapp",
  "password": "password",
  "database": "hhapp",
  "entities": [
    "./src/entity/*.ts"
  ],
  "logging": true,
  "synchronize": true
}
