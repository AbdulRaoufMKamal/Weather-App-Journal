const projectData = {

};

const express = require('express');

const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('website'));
app.use(cors());

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.post('/app', (req,res) => {
    projectData.push(req.body);
    console.log(req);
});

const port = 8080;

const server = app.listen(port, listening);

function listening () {
    console.log('server running on localhost http://localhost:'+ port);
}

