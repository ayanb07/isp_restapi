import express from 'express'
import bodyParser from 'body-parser'
import dbConfig from './config/database.config.js'
import mongoose from 'mongoose'
import routes from './app/routes/note.routes.js'
import swaggerUI from 'swagger-ui-express'
//create express app
const app = express();
var swaggerDocument = require('./swagger.json');

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(()=>{
	console.log("Successfully conneced to the database");
}).catch(err=>{
	console.log('Could not connect to database. Exiting now...', err);
	process.exit();
});
// define a simple route
app.get('/',(req,res)=>{
	res.json({"message":"My Message"});
});

// listen for requests
routes(app);
app.listen(3000, ()=>{ 
	console.log("Server is listening on port 3000"); 
});