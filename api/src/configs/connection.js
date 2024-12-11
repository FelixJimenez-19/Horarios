const mysql = require('mysql');
module.exports = class Connection {
    db_params = {
        host: "localhost",
        user: "root",
        password: "",
        database: "horarios",
        port:"3308"
    }
    db_query = (sql, res) => {
        let conn = mysql.createConnection(this.db_params);
        conn.query(sql, (err, rows) => {
            (rows) ? res.json(rows): res.json(null);
        });
        conn.end();
    }
}