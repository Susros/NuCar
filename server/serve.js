/**
 * NuCar API Server
 * 
 * @author Kelvin Yin
 */

// Set up express framework
const express      = require('express');
const bodyParser   = require('body-parser');
const helmet       = require('helmet');
const cookieparser = require('cookie-parser');

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieparser());

// Listen at port 8080
app.listen(8080);

app.get("/", function(req, res) {
    res.end("Hello, World");
});