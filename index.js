//import modules
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Instance for express and PORT
const PORT = 3001;
const app = express();

//middleware to handle json and urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`Server is running on Port ${PORT}`);
	});
});
