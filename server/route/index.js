class Route {
	constructor(app, Global) {
		this._app = app;
		this._ = Global;
	}

	fileOpen() {
		var that = this;
		console.log('Iniliza file router');
		this._app.get('/file/root/*', function(req, res) {
			var result = [];
			var position = req.params[0];
			var currentPath = '/Users/' + position;
			var files = that._.fs.readdirSync(currentPath);
			files.forEach(function(path) {
				result.push({
					name: path,
					isFile: that._.fs.statSync(currentPath + '/' + path).isFile(),
					isDirectory: that._.fs.statSync(currentPath + '/' + path).isDirectory(),
					isHidden: path.indexOf('.') === 0
				});
			});
			res.send(result);
		});
		this._app.get('/file/image/*', function(req, res) {
			var filePath = req.params[0];
			var rootPath = '/Users/';
			try {
				var file = that._.fs.readFileSync(rootPath + filePath);
				var base64 = new Buffer(file).toString('base64');
				res.send(base64);
			} catch (e) {
				console.log(e);
				res.send('File not found');
			}
		});
		this._app.get('/file/audio/*', function(req, res) {
			var filePath = req.params[0];
			var rootPath = '/Users/';
			try {
				var file = that._.fs.readFileSync(rootPath + filePath);
				res.sendFile(rootPath + filePath);
			} catch (e) {
				console.log(e);
				res.send('File not found');
			}
		});
	}

	toString() {
		return this._app.toString();
	}
}

module.exports = Route;
