const mysql = require('mysql2');
const mongoose = require('mongoose');

// MySQL configuration
const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: '1qaz2wsxE',
    database: 'ffffourwood',
    port: 3306,
};

// MongoDB configuration
const mongoConfig = {
    url: 'mongodb://localhost:27017/aiblogify'
};


const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    slug: { type: String, required: true },
    status: { type: Number, default: 0 },
    commentsCounts: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    type: { type: Number, default: 0 },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    migrateCid: { type: Number }
}, {
    timestamps: true
});

const Articles = mongoose.model('articles', articleSchema);

const mysqlConnection = mysql.createConnection(mysqlConfig);

mysqlConnection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

    //mapping article contents
    mysqlConnection.query('SELECT * FROM ffffourwood_contents', (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return;
        }
        console.log('Fetched contents data from MySQL');
        const transformedData = results.filter(item => item.type == 'post').map(item => ({
            title: item.title,
            content: item.text,
            createdAt: item.created * 1000,
            updatedAt: item.modified * 1000,
            slug: item.slug,
            status: 1,
            commentsCounts: item.commentsNum,
            views: item.views,
            likes: item.agree,
            migrateCid: item.cid
        }));
        console.log("transformedData done")
        // connecting to MongoDB


        // MongoDB 连接
        mongoose.connect(mongoConfig.url)
            .then(() => {
                console.log('Connected to MongoDB');

                // 将数据插入 MongoDB
                Articles.insertMany(transformedData)
                    .then(() => {
                        console.log('Articles Data migrated successfully');
                        mongoose.connection.close();
                        mysqlConnection.end();
                    })
                    .catch(err => {
                        console.error('Error inserting data into MongoDB:', err);
                        mongoose.connection.close();
                        mysqlConnection.end();
                    });
            })
            .catch(err => {
                console.error('Error connecting to MongoDB:', err);
                mysqlConnection.end();
            });
    });
});