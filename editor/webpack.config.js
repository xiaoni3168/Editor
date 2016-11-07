var os = require('os');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

var IPv4;
for(var i=0;i<os.networkInterfaces().en0.length;i++){
    if(os.networkInterfaces().en0[i].family=='IPv4'){
        IPv4=os.networkInterfaces().en0[i].address;
    }
}

module.exports = {
	entry: {
		app: path.join(__dirname, 'app/index'),
		vendors: [
			'react', 
			'react-dom', 
			'react-route',
			'redux',
			'react-redux',
			'redux-thunk',
			'iscroll',
			'react-iscroll',
			'react-hammerjs'
		]
	},
	// entry: [
	// 	"webpack-dev-server/client?http://0.0.0.0:8080/",
	//     "webpack/hot/only-dev-server",
	//     "./src"
	// ],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(scss|sass)$/,
				loaders: ['style', 'css?sourceMap', 'postcss','sass-loader?sourceMap&sourceComments']
			},
			{
				test: /\.css$/,
				loaders: ['style?sourceMap', 'css?sourceMap']
			},
			{ 	test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
				loader: 'url-loader?limit=500000&name=[path][name].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['', '.js']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		new HtmlWebpackPlugin({template: path.join(__dirname, 'index.html')}),
		new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new WebpackShellPlugin({
        	onBuildEnd: ['open http://0.0.0.0:8000/']
        })
	],
	node: {
		__dirname: true
	},
	postcss: function() {
		return [autoprefixer({browsers: ['last 10 versions']}), precss];
	},
	debug: true,
    devtool: 'eval-source-map',
	devServer:{
		historyApiFallback:true,
		hot:true,
		inline:true,
		progress:true,
		host: '0.0.0.0',
		port: 8000,
		proxy: {
            '/api/*': {
                target: 'http://' + IPv4 + ':10999',
                secure: true,
                changeOrigin: true,
                xfwd: true,
                pathRewrite: {'^/api' : ''}
            }
        }
	}
};