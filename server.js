const projectData = {

};

const express = require('express');

const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('website'));
app.use(cors({
    credentials: true
}));

app.get('/getWeatherData',(req,res) => {
    res.send(projectData);
    console.log(projectData);
});

app.post('/postWeatherData', (req,res) => {
    const d = new Date();
    const date = {
        day: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear()        
    }
    projectData.date = date;
    projectData.temp = req.body.main.temp;
    projectData.feeling = req.body.feeling;
});

const port = 8080;

const server = app.listen(port, listening);

function listening () {
    console.log('server running on localhost http://localhost:'+ port);
}

