const http = require('http');
const app = require('./app');


// app.set('port', 3001);
app.listen(3001, () => console.log('Running on port 3001'));


console.log("Server listening at 3001")

