const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mibd'
});

db.connect(err => {
    if(err){
        console.log('Error conexión:', err);
    }else{
        console.log('Base conectada');
    }
});

module.exports = db;