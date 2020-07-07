
let express = require('express');
let app = express();
let server = require('http').Server(app);


app.use(express.static(__dirname));

server.listen(4649,()=>{console.log('listen to port yoroshiku');});
