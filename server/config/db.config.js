import { connection, connect } from 'mongoose';
import env from './config';


export default (async () => {
    connect(env.MONGO_DB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'test'
    }).catch((e) => {
        console.log('Database connectivity error ', e)
    })
    const db = connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('connected');
    });
})()