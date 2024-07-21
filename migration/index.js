const mysql = require('mysql2');
const { MongoClient } = require('mongodb');

// MySQL 配置
const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: '1qaz2wsxE',
    database: 'ffffourwood',
    port: 3306,
};

// MongoDB 配置
const mongoConfig = {
    url: 'mongodb://localhost:27017',
    dbName: 'aiblogify'
};

// MySQL 连接

const mysqlConnection = mysql.createConnection(mysqlConfig);

mysqlConnection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

    // 从 MySQL 中读取数据
    // mysqlConnection.query('SELECT * FROM your_mysql_table', (err, results) => {
    //     if (err) {
    //         console.error('Error fetching data from MySQL:', err);
    //         return;
    //     }

    //     // MongoDB 连接
    //     MongoClient.connect(mongoConfig.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    //         if (err) {
    //             console.error('Error connecting to MongoDB:', err);
    //             return;
    //         }
    //         console.log('Connected to MongoDB');

    //         const db = client.db(mongoConfig.dbName);
    //         const collection = db.collection('your_mongodb_collection');

    //         // 将数据插入 MongoDB
    //         collection.insertMany(results, (err, res) => {
    //             if (err) {
    //                 console.error('Error inserting data into MongoDB:', err);
    //                 return;
    //             }
    //             console.log('Data migrated successfully');
    //             client.close();
    //             mysqlConnection.end();
    //         });
    //     });
    // });
});
