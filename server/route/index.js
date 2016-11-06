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
	}

	toString() {
		return this._app.toString();
	}
}

module.exports = Route;