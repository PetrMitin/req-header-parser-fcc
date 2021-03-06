// server.js
// where your node app starts
const PORT = process.env.PORT || 4000
const IPData = require('ipdata').default;

const getIpAddress = async () => {
  const ipdata = new IPData('fbeab82167ad603d2f38833291eb75b9b46957f12b28af684ef82f48');
  const data = await ipdata.lookup();
  return data.ip;
}

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/whoami', async (req, res) => {
  const ip = await getIpAddress();
  res.json({
    "ipaddress": ip, 
    "language": req.headers["accept-language"],
    "software": req.headers["user-agent"]
   })
})

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
