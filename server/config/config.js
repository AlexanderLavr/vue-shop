const dotenv = require('dotenv');
dotenv.config()


export default {
    SERVER_PORT: process.env.SERVER_PORT, 
    MONGO_DB_PATH: process.env.MONGO_DB_PATH
}