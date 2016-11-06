var Global = require('./environment/index.js');
var Route = require('./route');

var app = new Global.express();
var route = new Route(app, Global);

route.fileOpen();

app.listen(10999);