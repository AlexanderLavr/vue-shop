import app from './server/App';
import path from 'path';
import serveStatic from 'serve-static';
import env from './server/config/config';
import './server/config/db.config';

app.use('/', serveStatic(path.join(__dirname, '/dist')))

// // this * route is to serve project on different page routes except root `/`
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, '/dist/index.html'))
// })
app.listen(env.SERVER_PORT, ()=>{
    console.log(`App is listening on port: ${env.SERVER_PORT}`)
})
