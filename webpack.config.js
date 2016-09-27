var webpack = require('webpack')
var prism = require('prismjs')
var autoprefixer = require('autoprefixer')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

var marked = require('marked')
var renderer = new marked.Renderer()
renderer.code = (code, language) => {
    var html = prism.highlight(code, prism.languages.javascript)
    return `<pre class="language-${language}"><code class="language-${language}">${html}</code></pre>`
}


module.exports = {
    entry: './index.js',
    output: {
        path: './',
        filename: 'bundle.js',
        sourceMapFilename: "[name].js.map",
    },
    module: {
        preLoaders: [
            { test: /\.html$/, loader: 'riotjs' },
            { test: /\.js$/, loader: 'eslint!source-map' },
        ],
        loaders: [
            { test: /\.md$/, loader: 'html!markdown'},
            { test: /\.(jpe?g|png|gif|svg|mp4)$/i, loader: 'file'},
            { test: /\.html$|\.js$/, loader: 'babel', query: { presets: 'es2015-riot' }},
            { test: /\.less$/, loader: 'style!css?minimize!postcss!less'},
        ]
    },
    markdownLoader: {
        renderer: renderer
    },
    postcss: () => {
        return [
            autoprefixer({browsers: 'last 2 versions'})
        ];
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot'
        }),
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 8081,
                proxy: 'http://localhost:8080/'
            },
            {
                reload: true
            }
        )
    ],
    eslint: {
        configFile: './.eslintrc'
    },
    devtool: 'source-map'
}
