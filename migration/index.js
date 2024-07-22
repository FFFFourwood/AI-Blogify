const mysql = require('mysql2');
const mongoose = require('mongoose');

// MySQL configuration

const mysqlConfig = {
    host: '',
    user: '',
    password: '',
    database: '',
    port: 3306,
};

// MongoDB configuration
const mongoConfig = {
    url: 'mongodb://127.0.0.1:27017/aiblogify'
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
    migrateCid: { type: Number },
    description: { type: String, default: '' },
    coverImg: { type: String, default: '' },
}, {
    timestamps: true
});

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', },
    createdAt: { type: Date, default: Date.now },
    title: { type: String, default: '' },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    migrateParent: { type: Number }
}, {
    timestamps: true
});

const Articles = mongoose.model('Articles', articleSchema);
const Images = mongoose.model('Images', imageSchema);

const mysqlConnection = mysql.createConnection(mysqlConfig);

const parseSerializedData = (str) => {
    const obj = {};
    const regex = /s:(\d+):"([^"]*)";|i:(\d+);/g;
    let match;
    let key = null;

    while ((match = regex.exec(str)) !== null) {
        if (match[2] !== undefined) { // string value
            if (key === null) {
                key = match[2];
            } else {
                obj[key] = match[2];
                key = null;
            }
        } else if (match[3] !== undefined) { // integer value
            obj[key] = parseInt(match[3], 10);
            key = null;
        }
    }
    return obj;
};

const baseUrl = "https://ffffourwood.cn";

const processImageUrl = (str) => {
    const parsed = parseSerializedData(str);
    if (parsed.path.startsWith("/https")) {
        parsed.path = parsed.path.slice(1);
    } else if (parsed.path.startsWith("/usr/uploads")) {
        parsed.path = baseUrl + parsed.path;
    }
    return parsed.path;
};

const imageRegexes = [
    /<img\s+[^>]*src=['"]([^'"]+)['"]/g,  // <img src='***' or <img src="***"
    /!\[.*?\]\((https?:\/\/[^\)]+)\)/g,  // ![](https://****)
    /\[([^\]]+)\]:\s*(https?:\/\/[^\s]+)/g,  // [1]: https://****
    /!\[.*?\]\[(\d+)\]/g  // ![IMG_4200.PNG][1] or ![IMG_4200.PNG][66]
];

const extractImageUrls = (content, refMap) => {
    const urls = new Set();
    imageRegexes.forEach((regex, index) => {
        let match;
        while ((match = regex.exec(content)) !== null) {
            if (index === 3) {
                const ref = match[1];
                if (refMap && refMap[ref]) {
                    urls.add(refMap[ref]);
                }
            } else {
                urls.add(match[1]);
            }
        }
    });
    return Array.from(urls);
};

const extractRefMap = (content) => {
    const refMap = {};
    const refRegex = /\[([^\]]+)\]:\s*(https?:\/\/[^\s]+)/g;
    let match;
    while ((match = refRegex.exec(content)) !== null) {
        refMap[match[1]] = match[2];
    }
    return refMap;
};
const isValidUrl = (url) => {
    return url.startsWith('http://') || url.startsWith('https://');
};

const getContentDataFromMySQL = () => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query('SELECT * FROM ffffourwood_contents', (err, results) => {
            if (err) {
                reject('Error fetching data from MySQL:', err);
            } else {
                resolve(results);
            }
        });
    });
};

const getFieldDataFromMySQL = () => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query('SELECT * FROM ffffourwood_fields', (err, results) => {
            if (err) {
                reject('Error fetching data from MySQL:', err);
            } else {
                resolve(results);
            }
        });
    });
};

const migrateData = async () => {
    try {
        await mongoose.connect(mongoConfig.url);
        console.log('Connected to MongoDB');

        mysqlConnection.connect(async (err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
                return;
            }
            console.log('Connected to MySQL');

            const SQLContent = await getContentDataFromMySQL();
            const SQLFields = await getFieldDataFromMySQL();

            const fieldMap = {};
            SQLFields.forEach(field => {
                if (!fieldMap[field.cid]) {
                    fieldMap[field.cid] = {};
                }
                fieldMap[field.cid][field.name] = field.str_value;
            });


            // Transform articles
            const transformedArticles = SQLContent.filter(item => item.type === 'post').map(item => {
                const refMap = extractRefMap(item.text);
                return ({
                    title: item.title,
                    content: item.text,
                    createdAt: new Date(item.created * 1000),
                    updatedAt: new Date(item.modified * 1000),
                    slug: item.slug,
                    status: 1,
                    commentsCounts: item.commentsNum,
                    views: item.views,
                    likes: item.agree,
                    migrateCid: item.cid,
                    description: fieldMap[item.cid]?.description || '',
                    coverImg: fieldMap[item.cid]?.thumb || '',
                    type: fieldMap[item.cid]?.mode === 'default' ? 0 :
                        fieldMap[item.cid]?.mode === 'none' ? 3 :
                            fieldMap[item.cid]?.mode === 'multiple' ? 2 :
                                fieldMap[item.cid]?.mode === 'single' ? 1 : 0,
                    refMap
                })
            });

            // Insert articles and create a mapping of migrateCid to ObjectId
            const articles = await Articles.insertMany(transformedArticles);
            console.log('Articles Data migrated successfully');

            const articleMap = {};
            articles.forEach(article => {
                articleMap[article.migrateCid] = article._id;
            });

            // Transform images
            const transformedImages = SQLContent.filter(item => item.type === 'attachment').map(item => ({
                title: item.title,
                createdAt: new Date(item.created * 1000),
                views: item.views,
                likes: item.agree,
                migrateCid: item.cid,
                url: processImageUrl(item.text),
                migrateParent: item.parent
            }));

            // Update images with the correct article ObjectId
            const updatedImages = transformedImages.map(image => ({
                ...image,
                article: articleMap[image.migrateParent]
            }));

            await Images.insertMany(updatedImages);
            console.log('Images Data migrated successfully');

            // Collect image URLs from article content and add to Images
            for (const article of articles) {
                const imageUrls = extractImageUrls(article.content, article.refMap);
                for (const url of imageUrls) {
                    if (!isValidUrl(url)) {
                        continue;
                    }
                    const existingImage = await Images.findOne({ url });
                    if (!existingImage) {
                        console.log(url)
                        await Images.create({
                            url,
                            article: article._id,
                            createdAt: new Date(),
                            title: '',
                            views: 0,
                            likes: 0,
                            migrateParent: article.migrateCid
                        });
                    }
                }
            }

            console.log('Additional Images Data migrated successfully');

            mongoose.connection.close();
            mysqlConnection.end();
        });
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
        mysqlConnection.end();
    }
};

migrateData();