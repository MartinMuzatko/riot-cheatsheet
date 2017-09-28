var webpack = require('webpack')
var path = require('path')
var prism = require('prismjs')
// var autoprefixer = require('autoprefixer')
// var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

var marked = require('marked')
var renderer = new marked.Renderer()
renderer.code = (code, language) => {
    var html = prism.highlight(code, prism.languages.javascript)
    return `<pre class="language-${language}"><code class="language-${language}">${html}</code></pre>`
}


module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve('./'),
        filename: 'bundle.js',
        sourceMapFilename: "bundle.js.map",
    },
    module: {
        rules: [
            { test: /\.html$/, loader: 'riotjs', enforce: 'pre' },
            { test: /\.md$/, use: [
                'html',
                {
                    loader: 'markdown',
                    options: {
                        renderer: renderer
                    }
                }
            ]},
            { test: /\.(jpe?g|png|gif|svg|mp4)$/i, loader: 'file'},
            { test: /\.html$|\.js$/, loader: 'babel', options: { presets: 'es2015-riot' }},
            { test: /\.less$/, loader: ['style','css','less']},
        ]
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    target: 'web',
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot'
        })
    ],
    devtool: 'source-map'
}
