const path = require('path')
const fetch = require('node-fetch')
const express = require('express')
const hbs = require('hbs')
const latestupdates = require('./utils/latestupdates')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT ? process.env.PORT : 3000

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)




// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/page', (req, res) => {


    latestupdates((error, allresults = {}) => {
        if (error) {
            return res.send({ error })
        }
        res.send(allresults)
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Real-Time Wikipedia Updates Monitor',
        name: 'Patrick Jobin'
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})



app.listen( port, () => {
    console.log('Server is up on port ' + port)
})






// const path = require('path');
// const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// if (process.env.NODE_ENV === 'test') {
//   require('dotenv').config({ path: '.env.test' });
// } else if (process.env.NODE_ENV === 'development') {
//   require('dotenv').config({ path: '.env.development' });
// } 

// module.exports = (env) => {
//   const isProduction = env === 'production';
//   const CSSExtract = new ExtractTextPlugin('styles.css');

//   return {
//     entry: ['babel-polyfill', './src/app.js'],
//     output: {
//       path: path.join(__dirname, 'public', 'dist'),
//       filename: 'bundle.js'
//     },
//     module: {
//       rules: [{
//         loader: 'babel-loader',
//         test: /\.js$/,
//         exclude: /node_modules/
//       }, {
//         test: /\.s?css$/,
//         use: CSSExtract.extract({
//           use: [
//             {
//               loader: 'css-loader',
//               options: {
//                 sourceMap: true
//               }
//             },
//             {
//               loader: 'sass-loader',
//               options: {
//                 sourceMap: true
//               }
//             }
//           ]
//         })
//       }]
//     },
//     plugins: [
//       CSSExtract,
//       new webpack.DefinePlugin({
//         'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
//         'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
//         'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
//         'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
//         'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
//         'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
//       })
//     ],
//     devtool: isProduction ? 'source-map' : 'inline-source-map',
//     devServer: {
//       contentBase: path.join(__dirname, 'public'),
//       historyApiFallback: true,
//       publicPath: '/dist/'
//     }
//   };
// };
